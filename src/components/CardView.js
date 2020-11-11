import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import get from 'lodash/get';
import { useQuery, useMutation, useQueryCache } from 'react-query';
import {
  ButtonToggle,
  Icon,
  SelectField,
  List,
  ListItem,
  ListItemContent,
  Avatar,
  Card,
  HorizontalGroup,
  Loading,
  TypeIcon,
} from '@trig-app/core-components';
import { Masonry } from 'masonic';
import useLocalStorage from '../utils/useLocalStorage';
import { updateCard, getCards } from '../utils/cardClient';

/* eslint-disable */
const CardBase = ({ data }) => {
  const queryCache = useQueryCache();
  const [favoritedMutate] = useMutation(updateCard, {
    onMutate: newCard => {
      const cardQueryKey = 'cards';
      queryCache.cancelQueries(cardQueryKey);
      const previousCards = queryCache.getQueryData(cardQueryKey);
      const newCards = get(previousCards, 'data', []).map(previousCard => {
        if (previousCard.id === newCard.id) {
          if (newCard.favorited) {
            return {
              ...previousCard,
              favorites: previousCard.favorites + 1,
              card_favorite: {
                card_id: newCard.id,
              },
            };
          } else {
            return {
              ...previousCard,
              favorites: previousCard.favorites - 1,
              card_favorite: null,
            };
          }
        }
        return previousCard;
      });
      queryCache.setQueryData(cardQueryKey, () => ({ data: newCards }));
      return () => queryCache.setQueryData(cardQueryKey, previousCards);
    },
    onError: (err, newCard, rollback) => rollback(),
    onSettled: () => queryCache.invalidateQueries(cardQueryKey),
  });

  const isFavorited = get(data, 'card_favorite.card_id', false);

  return (
    <Card
      key={data.id}
      dateTime={new Date(data.actual_created_at)}
      isFavorited={isFavorited}
      totalFavorites={data.favorites}
      onClickFavorite={async () => {
        await favoritedMutate(
          { favorited: !isFavorited, id: data.id },
          {
            onSuccess: () => {
              console.log('success!');
            },
          }
        );
      }}
      openInNewTab
      id={data.id}
      title={data.title}
      href={data.url}
      type={data.card_type.name}
      image={data.image}
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
      navigationList={[
        {
          onClick: () => null,
          item: (
            <HorizontalGroup margin={1.6}>
              <Icon type="edit" size={1.6} />
              <span>Edit Card</span>
            </HorizontalGroup>
          ),
        },
        {
          onClick: () => null,
          item: (
            <HorizontalGroup margin={1.6}>
              <Icon type="lock" size={1.6} />
              <span>Share</span>
            </HorizontalGroup>
          ),
        },
        {
          onClick: () => null,
          item: (
            <HorizontalGroup margin={1.6}>
              <Icon type="trash" size={1.6} />
              <span>Remove From Trig</span>
            </HorizontalGroup>
          ),
        },
      ]}
    />
  );
};

// this has to be defined outside of the component or the UI flashes
const CardRenderer = ({ data }) => {
  return <CardBase data={data} />;
};

const CardListItem = ({ card }) => {
  return (
    <ListItem
      href={card.url}
      onClick={() => {
        window.open(card.url, '_blank');
      }}
      renderItem={() => (
        <TypeIcon url={card.url} type={card.card_type.name} size={2.4} />
      )}
      renderContent={() => (
        <ListItemContent
          renderItem={() => (
            <Avatar
              firstName={card.user.first_name}
              lastName={card.user.last_name}
              email={card.user.email}
              size={4}
            />
          )}
          primary={card.title}
          secondary="Oct 27, 2018 at 5:35pm"
        />
      )}
      actions={[
        <Icon onClick={() => null} type="heart" color="s" size={1.6} />,
        <Icon
          type="horizontal-dots"
          color="s"
          size={1.6}
          onClick={() => null}
        />,
      ]}
    />
  );
};
/* eslint-enable */

const CardView = props => {
  const location = useLocation();
  const [cardCategory, setCardCategory] = useState('all');
  const [viewType, setViewType] = useLocalStorage(
    `card-view-location:${location.pathname}`,
    'thumbnail'
  );
  const { data: cards, isLoading: isCardsLoading } = useQuery(
    'cards',
    getCards,
    { refetchInterval: 15000 }
  );

  return (
    <div
      css={`
        width: 982px;
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
        {viewType === 'thumbnail' && !isCardsLoading && cards.data && (
          <Masonry
            // Provides the data for our grid items
            items={cards.data}
            itemHeightEstimate={400}
            itemKey={data => data.id}
            // Adds 8px of space between the grid cells
            columnGutter={6}
            // Sets the minimum column width to 172px
            columnWidth={251}
            // Pre-renders 5 windows worth of content
            overscanBy={5}
            // This is the grid item component
            render={CardRenderer}
          />
        )}
        {viewType === 'row' && !isCardsLoading && cards.data && (
          <List>
            {cards.data.map(card => {
              return <CardListItem card={card} />;
            })}
          </List>
        )}
      </div>
    </div>
  );
};

export default CardView;
