import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useMutation, useQueryClient } from 'react-query';
import {
  Icon,
  SelectField,
  Card,
  HorizontalGroup,
  toast,
} from '@trig-app/core-components';
import {
  MasonryScroller,
  usePositioner,
  useResizeObserver,
  useInfiniteLoader,
} from 'masonic';
import { updateCard, deleteCard } from '../utils/cardClient';
import useUser from '../utils/useUser';
import { CardQueryContext } from '../utils/useCards';
import EmptyState from './EmptyState';

export const saveView = async ({ id, userId }) => {
  await updateCard({ id, viewed_by: userId });
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
      const previousCardsByQuery = {};
      const queries = queryClient.getQueryCache().getAll();
      const me = queryClient.getQueryData('me');
      let removedCardFromUser = false;
      queries.forEach(query => {
        const { queryKey } = query;
        if (!queryKey || !queryKey.includes('cards')) return;
        queryClient.cancelQueries(queryKey);
        const previousCards = queryClient.getQueryData(queryKey);
        if (!previousCards) return;
        const cardBelongsToUser = previousCards.data.some(card => {
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
        if (!previousCards) return;
        previousCardsByQuery[queryKey] = previousCards;

        const newTags = removeTags({ previousCards, cardId: deletedId });

        const newCards = get(previousCards, 'data', []).filter(
          previousCard => previousCard.id !== deletedId
        );

        const newData = {
          ...previousCards,
          data: newCards,
        };

        if (get(newData, 'filters.tags', false)) {
          newData.filters.tags = newTags;
        }
        newData.meta.total_results = previousCards.meta.total_results - 1;
        queryClient.setQueryData(queryKey, () => newData);
      });

      return () =>
        queries.forEach(query => {
          const { queryKey } = query;
          if (!queryKey.includes('cards')) return;
          queryClient.setQueryData(queryKey, previousCardsByQuery[queryKey]);
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

/* eslint-disable */
const CardBase = ({ data }) => {
  const cardQueryKey = useContext(CardQueryContext);
  const mutateFavorite = useFavorite(cardQueryKey);
  const mutateDelete = useDelete(cardQueryKey);
  const { user } = useUser();

  return (
    <Card
      key={data.id}
      onClick={async () => {
        if (get(data, 'id', false)) {
          await saveView({ id: data.id, userId: user.id });
        }
      }}
      showTotalFavorites={false}
      dateTime={new Date(data.created_at)}
      isFavorited={data.is_favorited}
      totalFavorites={data.total_favorites}
      onClickFavorite={async () => {
        await mutateFavorite({ is_favorited: !data.is_favorited, id: data.id });
      }}
      description={data.description}
      openInNewTab
      title={data.title}
      href={data.url}
      image={
        data.thumbnail.path
          ? `${process.env.CDN_URL}${data.thumbnail.path}`
          : null
      }
      imageWidth={data.thumbnail.width}
      imageHeight={data.thumbnail.height}
      renderAvatar={() => null}
      navigationList={makeMoreList({
        mutate: mutateDelete,
        id: data.id,
      })}
    />
  );
};

// this has to be defined outside of the component or the UI flashes
const CardRenderer = ({ data }) => {
  return <CardBase data={data} />;
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
  totalResults: PropTypes.number,
  isLoading: PropTypes.bool,
  isFetchingNextPage: PropTypes.bool,
};

const defaultProps = {
  cards: [],
  isLoading: false,
  totalResults: 0,
  isFetchingNextPage: false,
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
  ...restProps
}) => {
  const { user } = useUser();

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
    { width: 780, columnWidth: 251, columnGutter: 6 },
    // This is our dependencies array. When these dependencies
    // change, the positioner cache will be cleared and the
    // masonry component will reset as a result.
    [cards.length]
  );

  const resizeObserver = useResizeObserver(positioner);

  return (
    <div
      css={`
        width: 776px;
      `}
      {...restProps}
    >
      <div
        css={`
          display: flex;
          margin-bottom: ${({ theme }) => theme.space[4]}px;
        `}
      >
        <SelectField
          css={`
            margin-left: auto;
          `}
          value={cardCohort}
          onChange={value => setCardCohort(value)}
          options={[
            { value: 'all', label: 'All Cards' },
            { value: 'recently-viewed', label: 'Recently Viewed' },
            { value: 'favorites', label: 'Favorites' },
          ]}
        />
      </div>
      <div
        css={`
          [role='grid'] {
            outline: none;
          }
        `}
      >
        {cards.length === 0 && user.total_cards !== 0 && (
          <EmptyState
            heading="No results"
            content="Looks like no cards were found for the filters you used"
          />
        )}
        {cards.length === 0 && user.total_cards === 0 && (
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
            items={cards}
            itemHeightEstimate={400}
            itemkey={data => data.id}
            positioner={positioner}
            height={900}
            resizeObserver={resizeObserver}
            // Pre-renders 5 windows worth of content
            overscanBy={5}
            // This is the grid item component
            render={CardRenderer}
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
