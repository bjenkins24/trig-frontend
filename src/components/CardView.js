import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import get from 'lodash/get';
import { useQuery, useMutation, useQueryCache } from 'react-query';
import {
  ButtonToggle,
  Icon,
  SelectField,
  List,
  Avatar,
  Card,
  HorizontalGroup,
  Loading,
  toast,
} from '@trig-app/core-components';
import { CardItem } from '@trig-app/core-components/dist/compositions';
import { MasonryScroller, usePositioner, useResizeObserver } from 'masonic';
import useLocalStorage from '../utils/useLocalStorage';
import { updateCard, deleteCard, getCards } from '../utils/cardClient';
import { useAuth } from '../context/authContext';

const generalCardQueryKey = 'cards';

export const saveView = async ({ id, userId }) => {
  await updateCard({ id, viewedBy: userId });
};

export const useDelete = cardQueryKey => {
  const queryCache = useQueryCache();
  const [mutate] = useMutation(deleteCard, {
    onMutate: deletedId => {
      queryCache.cancelQueries(cardQueryKey);
      const previousCards = queryCache.getQueryData(cardQueryKey);
      const newCards = get(previousCards, 'data', []).filter(
        previousCard => previousCard.id !== deletedId.id
      );
      const newData = {
        ...previousCards,
        data: newCards,
      };
      newData.meta.totalResults = previousCards.meta.totalResults - 1;
      queryCache.setQueryData(cardQueryKey, () => newData);
      return () => queryCache.setQueryData(cardQueryKey, previousCards);
    },
    onError: (err, newCard, rollback) => {
      toast({
        type: 'error',
        message: 'Something went wrong, the card could not be deleted.',
      });
      rollback();
    },
    onSettled: () => queryCache.invalidateQueries(cardQueryKey),
  });
  return mutate;
};

// For some reason useMutate makes the heart flash a little bit - so we're just doing it manually instead
export const useFavorite = cardQueryKey => {
  const queryCache = useQueryCache();
  const { user } = useAuth();

  return async fields => {
    queryCache.cancelQueries(cardQueryKey);
    const previousCards = queryCache.getQueryData(cardQueryKey);
    const newCards = get(previousCards, 'data', []).map(previousCard => {
      if (previousCard.id === fields.id) {
        if (fields.isFavorited) {
          return {
            ...previousCard,
            totalFavorites: previousCard.totalFavorites + 1,
            isFavorited: true,
          };
        }
        return {
          ...previousCard,
          totalFavorites: previousCard.totalFavorites - 1,
          isFavorited: false,
        };
      }
      return previousCard;
    });
    queryCache.setQueryData(cardQueryKey, () => ({
      ...previousCards,
      data: newCards,
    }));
    try {
      let newFields = fields;
      if (fields.isFavorited) {
        newFields = { ...fields, favoritedBy: user.id };
      } else {
        newFields = { ...fields, unfavoritedBy: user.id };
      }
      delete newFields.isFavorited;
      await updateCard(newFields);
      // We're not going to invalidate the query because it makes the heart flash
    } catch (error) {
      // Rollback
      queryCache.setQueryData(cardQueryKey, previousCards);
      toast({
        type: 'error',
        message: 'Something went wrong, the card could not be favorited.',
      });
    }
  };
};

export const makeMoreList = ({ mutate, title, id }) => [
  {
    onClick: async () => {
      toast({
        message: `The card "${title}" was removed from Trig successfully.`,
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
  const mutateFavorite = useFavorite(generalCardQueryKey);
  const mutateDelete = useDelete(generalCardQueryKey);
  const { user } = useAuth();

  return (
    <Card
      isLoading={!get(data, 'id', false) || !data.lastAttemptedSync}
      key={data.id}
      onClick={async () => {
        if (get(data, 'id', false)) {
          await saveView({ id: data.id, userId: user.id });
        }
      }}
      dateTime={new Date(data.createdAt)}
      isFavorited={data.isFavorited}
      totalFavorites={data.totalFavorites}
      onClickFavorite={async () => {
        await mutateFavorite({ isFavorited: !data.isFavorited, id: data.id });
      }}
      description={data.description}
      openInNewTab
      title={data.title}
      href={data.url}
      type={data.cardType}
      image={data.image}
      imageWidth={data.imageWidth}
      imageHeight={data.imageHeight}
      renderAvatar={() => {
        return (
          <Avatar
            size={1.6}
            firstName={data.user.firstName}
            lastName={data.user.lastName}
            email={data.user.email}
          />
        );
      }}
      navigationList={makeMoreList({
        mutate: mutateDelete,
        id: data.id,
        title: data.title,
      })}
    />
  );
};

// this has to be defined outside of the component or the UI flashes
const CardRenderer = ({ data }) => {
  return <CardBase data={data} />;
};

const CardListItem = React.memo(({ card }) => {
  const updateFavorite = useFavorite(generalCardQueryKey);
  const mutateDelete = useDelete(generalCardQueryKey);
  const { user } = useAuth();

  return (
    <CardItem
      isLoading={!get(card, 'id', false) || !card.lastAttemptedSync}
      href={card.url}
      onClick={async () => {
        if (get(card, 'id', false)) {
          await saveView({ id: card.id, userId: user.id });
        }
      }}
      openInNewTab
      dateTime={new Date(card.createdAt)}
      favoriteProps={{
        onClick: async () => {
          await updateFavorite({ isFavorited: !card.isFavorited, id: card.id });
        },
        type: card.isFavorited ? 'heart-filled' : 'heart',
      }}
      avatarProps={{
        firstName: card.user.firstName,
        lastName: card.user.lastName,
        email: card.user.email,
      }}
      cardType={card.cardType}
      title={card.title}
      moreProps={{}}
      navigationList={makeMoreList({
        mutate: mutateDelete,
        id: card.id,
        title: card.title,
      })}
    />
  );
});
/* eslint-enable */

const CardView = props => {
  const location = useLocation();
  const [cardCategory, setCardCategory] = useState('all');
  const [viewType, setViewType] = useLocalStorage(
    `card-view-location:${location.pathname}`,
    'thumbnail'
  );
  const {
    data: cards,
    isLoading: isCardsLoading,
  } = useQuery(generalCardQueryKey, getCards, { refetchInterval: 10000 });

  const items = get(cards, 'data', []);

  const positioner = usePositioner(
    { width: 780, columnWidth: 251, columnGutter: 6 },
    // This is our dependencies array. When these dependencies
    // change, the positioner cache will be cleared and the
    // masonry component will reset as a result.
    [items.length]
  );

  const resizeObserver = useResizeObserver(positioner);

  return (
    <div
      css={`
        width: 776px;
      `}
      {...props}
    >
      <div
        css={`
          display: flex;
          margin-bottom: ${({ theme }) => theme.space[4]}px;
        `}
      >
        <ButtonToggle
          css={`
            margin-top: 2px;
          `}
          defaultSelectedIndex={viewType === 'thumbnail' ? 0 : 1}
        >
          <Icon
            type="thumbnail-view"
            onClick={() => setViewType('thumbnail')}
            size={1.6}
          />
          <Icon type="row-view" onClick={() => setViewType('row')} size={1.6} />
        </ButtonToggle>
        <SelectField
          css={`
            margin-left: auto;
          `}
          value={cardCategory}
          onChange={value => setCardCategory(value)}
          options={[
            { value: 'all', label: 'All Cards' },
            { value: 'recent', label: 'Recently Viewed' },
            { value: 'most-viewed', label: 'Most Viewed' },
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
        {isCardsLoading && <Loading size={4.8} />}
        {viewType === 'thumbnail' && !isCardsLoading && items && (
          <MasonryScroller
            // Provides the data for our grid items
            items={items}
            itemHeightEstimate={400}
            itemkey={data => data.id}
            positioner={positioner}
            height={900}
            resizeObserver={resizeObserver}
            // Pre-renders 5 windows worth of content
            overscanBy={5}
            // This is the grid item component
            render={CardRenderer}
          />
        )}
        {viewType === 'row' && !isCardsLoading && cards.data && (
          <List>
            {cards.data.map(card => {
              return <CardListItem card={card} key={card.id} />;
            })}
          </List>
        )}
      </div>
    </div>
  );
};

export default CardView;
