import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useMutation, useQueryClient } from 'react-query';
import {
  Icon,
  SelectField,
  Card,
  CardLarge,
  CardTwitter,
  HorizontalGroup,
  toast,
  Tag,
  ButtonToggle,
  Heading2,
} from '@trig-app/core-components';
import {
  MasonryScroller,
  usePositioner,
  useResizeObserver,
  useInfiniteLoader,
} from 'masonic';
import { updateCard, deleteCard, saveCardView } from '../utils/cardClient';
import useUser from '../utils/useUser';
import { CardQueryContext } from '../utils/useCards';
import EmptyState from './EmptyState';
import { DEFAULT_TO_SCREENSHOTS } from '../constants/defaultToScreenshots';
import { track } from '../utils/track';
import useLocalStorage from '../utils/useLocalStorage';

const thumbnailWidth = 294;

export const saveView = async ({ token, isPublic }) => {
  track('User Views Card', {
    isAuthenticated: !isPublic,
  });
  await saveCardView(token);
};

const removeTags = ({ previousPage, cardId }) => {
  // Remove the tags for the card optimistically as well
  const tagsToRemove = get(previousPage, 'data', []).reduce(
    (accumulator, previousCard) => {
      if (
        previousCard.id !== cardId ||
        typeof previousCard.tags === 'undefined'
      ) {
        return accumulator;
      }

      return previousCard.tags;
    },
    []
  );

  return get(previousPage, 'filters.tags', [])
    .map(tag => {
      const newTag = tag;
      if (tagsToRemove.includes(tag.name)) {
        newTag.count -= 1;
      }
      return newTag;
    })
    .reduce((accumulator, tag) => {
      if (tag.count === 0) return accumulator;
      return [...accumulator, tag];
    }, []);
};

export const useDelete = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteCard, {
    onMutate: async ({ id: deletedId }) => {
      const previousResponseByQuery = {};
      const queries = queryClient.getQueryCache().getAll();
      const me = queryClient.getQueryData('me');
      let removedCardFromUser = false;
      queries.forEach(query => {
        const { queryKey } = query;
        if (!queryKey || !queryKey.includes('cards')) return;
        queryClient.cancelQueries(queryKey);
        const previousResponse = queryClient.getQueryData(queryKey);
        if (!previousResponse) return;
        const newPages = get(previousResponse, 'pages', []).map(page => {
          // Remove the card from total_cards on the user as well
          const cardBelongsToUser = page.data.some(card => {
            return card.user.id === me.data.id;
          });
          if (cardBelongsToUser && !removedCardFromUser) {
            queryClient.setQueryData('me', {
              data: {
                ...me.data,
                total_cards: me.data.total_cards - 1,
              },
            });

            removedCardFromUser = true;
          }

          const newTags = removeTags({ previousPage: page, cardId: deletedId });

          const newCards = get(page, 'data', []).filter(
            previousCard => previousCard.id !== deletedId
          );

          const newPage = {
            ...page,
            data: newCards,
          };

          if (get(page, 'filters.tags', false)) {
            newPage.filters.tags = newTags;
          }
          newPage.meta.total_results = page.meta.total_results - 1;
          return newPage;
        });

        previousResponseByQuery[queryKey] = previousResponse;
        queryClient.setQueryData(queryKey, () => ({
          ...previousResponse,
          pages: newPages,
        }));
      });

      return () =>
        queries.forEach(query => {
          const { queryKey } = query;
          if (!queryKey.includes('cards')) return;
          queryClient.setQueryData(queryKey, previousResponseByQuery[queryKey]);
        });
    },
    onError: (err, newCard, rollback) => {
      toast({
        type: 'error',
        message: 'Something went wrong, the card could not be deleted.',
      });
      rollback();
    },
    onSuccess: () => queryClient.invalidateQueries('cards'),
  });
  return mutate;
};

// For some reason useMutate makes the heart flash a little bit - so we're just doing it manually instead
export const useFavorite = cardQueryKey => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return async fields => {
    await queryClient.cancelQueries(cardQueryKey);
    let newPages = [];

    const previousResponseByQuery = {};
    const queries = queryClient.getQueryCache().getAll();
    queries.forEach(query => {
      const { queryKey } = query;
      if (queryKey.includes('cards')) {
        const previousResponse = queryClient.getQueryData(queryKey);
        previousResponseByQuery[queryKey] = previousResponse;
        let newResponse = {};
        if (queryKey.includes('favorites')) {
          newPages = get(previousResponse, 'pages', []).map(page => {
            const newFilters = get(page, 'filters', { tags: [], types: [] });
            if (get(newFilters, 'filters.tags', [])) {
              newFilters.tags = removeTags({
                previousPage: page,
                cardId: fields.id,
              });
            }
            return {
              ...page,
              filters: newFilters,
              data: get(page, 'data', []).filter(card => card.id !== fields.id),
            };
          });
          newResponse = {
            ...previousResponse,
            pages: newPages,
          };
        } else {
          newPages = get(previousResponse, 'pages', []).map(page => {
            return {
              ...page,
              data: get(page, 'data', []).map(previousCard => {
                if (previousCard.id === fields.id) {
                  if (fields.is_favorited) {
                    return {
                      ...previousCard,
                      total_favorites: previousCard.total_favorites + 1,
                      is_favorited: true,
                    };
                  }
                  return {
                    ...previousCard,
                    total_favorites: previousCard.total_favorites - 1,
                    is_favorited: false,
                  };
                }
                return previousCard;
              }),
            };
          });
          newResponse = {
            ...previousResponse,
            pages: newPages,
          };
        }
        queryClient.setQueryData(queryKey, () => newResponse);
      }
    });

    try {
      let newFields = fields;
      if (fields.is_favorited) {
        newFields = { ...fields, favorited_by: user.id };
      } else {
        newFields = { ...fields, unfavorited_by: user.id };
      }
      delete newFields.is_favorited;
      await updateCard(newFields);
    } catch (error) {
      // Rollback
      queries.forEach(query => {
        const { queryKey } = query;
        if (queryKey.includes('cards')) {
          queryClient.setQueryData(queryKey, previousResponseByQuery[queryKey]);
        }
      });
      toast({
        type: 'error',
        message: 'Something went wrong, the card could not be favorited.',
      });
    }
  };
};

export const makeMoreList = ({ mutate, id }) => [
  {
    onClick: async () => {
      toast({
        message: `The card was removed from Trig successfully.`,
      });
      await mutate({ id });
    },
    item: (
      <HorizontalGroup margin={1.6}>
        <Icon type="trash" size={1.6} />
        <span>Remove From Trig</span>
      </HorizontalGroup>
    ),
  },
];

const getImage = data => {
  const shouldShowScreenshot = DEFAULT_TO_SCREENSHOTS.includes(
    new URL(data.url).host
  );
  if (data.image.path && !shouldShowScreenshot) {
    return data.image;
  }
  if (data.screenshot.path) {
    return data.screenshot;
  }
  return {
    path: null,
    width: null,
    height: null,
  };
};

/* eslint-disable */
const CardBase = ({ data }) => {
  const cardQueryKey = useContext(CardQueryContext);
  const mutateFavorite = useFavorite(cardQueryKey);
  const mutateDelete = useDelete(cardQueryKey);

  const image = getImage(data);

  return (
    <Card
      key={data.id}
      width={thumbnailWidth}
      onClick={async () => {
        if (get(data, 'id', false)) {
          await saveView({ token: data.token, isPublic: data.is_public });
        }
      }}
      showTotalFavorites={false}
      dateTime={new Date(data.created_at)}
      showActions={!data.is_public}
      isFavorited={data?.is_favorited}
      totalFavorites={data?.total_favorites}
      onClickFavorite={async () => {
        await mutateFavorite({ is_favorited: !data.is_favorited, id: data.id });
      }}
      description={data.description}
      openInNewTab
      title={data.title}
      href={data.url}
      type={data.type}
      image={image.path ? `${process.env.CDN_URL}${image.path}` : null}
      imageWidth={image.width}
      imageHeight={image.height}
      renderAvatar={() => null}
      navigationList={makeMoreList({
        mutate: mutateDelete,
        id: data.id,
      })}
    />
  );
};

/* eslint-disable */
const CardLargeBase = ({ data }) => {
  const cardQueryKey = useContext(CardQueryContext);
  const mutateFavorite = useFavorite(cardQueryKey);
  const mutateDelete = useDelete(cardQueryKey);

  if (data.type === 'tweet' && data.tweet.name) {
    const getLink = () => {
      if (data.tweet.link.href) {
        return {
          href: data.tweet.link.url,
          imageSrc: data.tweet.link.image_src,
          title: data.tweet.link.title,
          description: data.tweet.link.description,
        };
      }
      return null;
    };
    const getReply = () => {
      if (data.tweet.reply.content) {
        return {
          handle: data.tweet.reply.handle,
          name: data.tweet.reply.name,
          replyingTo: data.tweet.reply.replying_to,
          content: data.tweet.reply.content,
          avatar: data.tweet.reply.avatar,
        };
      }
      return null;
    };
    return (
      <div>
        <CardTwitter
          key={data.id}
          onClick={async () => {
            if (get(data, 'id', false)) {
              await saveView({ token: data.token, isPublic: data.is_public });
            }
          }}
          showTotalFavorites={false}
          canFavorite={!data.is_public}
          isFavorited={data?.is_favorited}
          totalFavorites={data?.total_favorites}
          onClickFavorite={async () => {
            await mutateFavorite({
              is_favorited: !data.is_favorited,
              id: data.id,
            });
          }}
          href={data.url}
          type={data.type}
          totalViews={data.total_views}
          onClickTrash={() => mutateDelete({ id: data.id })}
          avatar={data.tweet.avatar}
          name={data.tweet.name}
          handle={data.tweet.handle}
          date={data.tweet.created_at}
          content={data.title}
          link={getLink()}
          reply={getReply()}
          images={data.tweet.images}
        />
        <HorizontalGroup
          margin={0.4}
          css={`
            flex-wrap: wrap;
            & > * {
              margin-top: ${({ theme }) => theme.space[1]}px;
            }
          `}
        >
          {data.tags.map(tag => {
            return (
              <Tag key={tag} isSelected={data.selectedTags.includes(tag)}>
                {tag}
              </Tag>
            );
          })}
        </HorizontalGroup>
      </div>
    );
  }

  return (
    <div>
      <CardLarge
        key={data.id}
        onClick={async () => {
          if (get(data, 'id', false)) {
            await saveView({ token: data.token, isPublic: data.is_public });
          }
        }}
        showTotalFavorites={false}
        canFavorite={!data.is_public}
        isFavorited={data?.is_favorited}
        totalFavorites={data?.total_favorites}
        onClickFavorite={async () => {
          await mutateFavorite({
            is_favorited: !data.is_favorited,
            id: data.id,
          });
        }}
        title={data.title}
        href={data.url}
        type={data.type}
        image={
          data.screenshot_large.path
            ? `${process.env.CDN_URL}${data.screenshot_large.path}`
            : null
        }
        imageWidth={data.screenshot_large.width}
        imageHeight={data.screenshot_large.height}
        totalViews={data.total_views}
        onClickTrash={() => mutateDelete({ id: data.id })}
        maxHeight={400}
      />
      <HorizontalGroup
        margin={0.4}
        css={`
          flex-wrap: wrap;
          & > * {
            margin-top: ${({ theme }) => theme.space[1]}px;
          }
        `}
      >
        {data.tags.map(tag => {
          return (
            <Tag key={tag} isSelected={data.selectedTags.includes(tag)}>
              {tag}
            </Tag>
          );
        })}
      </HorizontalGroup>
    </div>
  );
};

// this has to be defined outside of the component or the UI flashes
const CardRenderer = ({ data }) => {
  return <CardBase data={data} />;
};

const CardLargeRenderer = ({ data }) => {
  return <CardLargeBase data={data} />;
};

const CardViewProps = {
  cards: PropTypes.array,
  cardCohort: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  fetchNextPage: PropTypes.func.isRequired,
  setCardCohort: PropTypes.func.isRequired,
  setIsCreateLinkOpen: PropTypes.func.isRequired,
  selectedTags: PropTypes.array,
  totalResults: PropTypes.number,
  isLoading: PropTypes.bool,
  isFetchingNextPage: PropTypes.bool,
  isPublic: PropTypes.bool,
};

const defaultProps = {
  cards: [],
  isLoading: false,
  totalResults: 0,
  isFetchingNextPage: false,
  isPublic: false,
  selectedTags: [],
};

const CardView = ({
  cards,
  cardCohort,
  fetchNextPage,
  setCardCohort,
  setIsCreateLinkOpen,
  isFetchingNextPage,
  isLoading,
  totalResults,
  isPublic,
  selectedTags,
  ...restProps
}) => {
  const { user } = useUser();
  const thumbnailView = 'thumbnail-view';
  const largeThumbnailView = 'large-thumbnail-view';
  const [currentView, setCurrentView] = useLocalStorage(
    'currentView',
    largeThumbnailView
  );
  const updatedCards = cards.map(card => ({
    ...card,
    is_public: isPublic,
    selectedTags,
  }));

  const memoizedCallback = useCallback(async () => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage]);

  const maybeLoadMore = useInfiniteLoader(memoizedCallback, {
    isItemLoaded: (index, items) => {
      return !!items[index];
    },
    minimumBatchSize: 20,
    threshold: 1,
    totalItems: totalResults,
  });

  const positioner = usePositioner(
    {
      width: 1200,
      columnWidth: currentView === largeThumbnailView ? 568 : thumbnailWidth,
      columnGutter: currentView === largeThumbnailView ? 16 : 6,
    },
    // This is our dependencies array. When these dependencies
    // change, the positioner cache will be cleared and the
    // masonry component will reset as a result.
    [cards.length]
  );

  const resizeObserver = useResizeObserver(positioner);

  return (
    <div
      css={`
        width: 1200px;
      `}
      {...restProps}
    >
      <div
        css={`
          display: flex;
          margin-bottom: ${({ theme }) => theme.space[4]}px;
        `}
      >
        <Heading2
          css={`
            margin: ${({ theme }) => theme.space[1]}px 0 0 0;
          `}
        >
          Cards
        </Heading2>
        <ButtonToggle
          defaultSelectedIndex={currentView === thumbnailView ? 1 : 0}
          css={`
            margin: 2px ${({ theme }) => theme.space[4]}px 0 auto;
          `}
        >
          <Icon
            type="row-view"
            onClick={() => setCurrentView(largeThumbnailView)}
            size={1.6}
          />
          <Icon
            type="thumbnail-view"
            onClick={() => setCurrentView(thumbnailView)}
            size={1.6}
          />
        </ButtonToggle>
        {!isPublic && (
          <SelectField
            value={cardCohort}
            onChange={value => setCardCohort(value)}
            options={[
              { value: 'all', label: 'All Cards' },
              { value: 'recently-viewed', label: 'Recently Viewed' },
              { value: 'favorites', label: 'Favorites' },
            ]}
          />
        )}
      </div>
      <div
        css={`
          [role='grid'] {
            outline: none;
          }
        `}
      >
        {(cards.length === 0 && isPublic) ||
          (user && user.total_cards !== 0 && cards.length === 0 && (
            <EmptyState
              heading="No results"
              content="Looks like no cards were found for the filters you used"
            />
          ))}
        {!isPublic && cards.length === 0 && user?.total_cards === 0 && (
          <EmptyState
            heading="You Have No Cards!"
            content="Get started by adding a card to Trig and see your content automatically organized."
            buttonProps={{
              children: 'Add Your First Card',
              onClick: () => setIsCreateLinkOpen(true),
            }}
          />
        )}
        {!isLoading && cards && (
          <MasonryScroller
            // Provides the data for our grid items
            items={updatedCards}
            itemHeightEstimate={400}
            itemkey={data => data.id}
            positioner={positioner}
            height={900}
            resizeObserver={resizeObserver}
            // Pre-renders 5 windows worth of content
            overscanBy={5}
            // This is the grid item component
            render={
              currentView === largeThumbnailView
                ? CardLargeRenderer
                : CardRenderer
            }
            onRender={maybeLoadMore}
          />
        )}
      </div>
    </div>
  );
};

CardView.propTypes = CardViewProps;
CardView.defaultProps = defaultProps;

export default CardView;
