import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import faker from 'faker';
import {
  ButtonToggle,
  Icon,
  SelectField,
  List,
  ListItem,
  ListItemContent,
  FileIcon,
  Avatar,
  Card,
  HorizontalGroup,
} from '@trig-app/core-components';
import { Masonry } from 'masonic';
import useLocalStorage from '../utils/useLocalStorage';

const MockCardsSize = [
  { width: 600, height: 400 },
  { width: faker.random.number(800), height: faker.random.number(800) },
  { width: faker.random.number(800), height: faker.random.number(800) },
  { width: faker.random.number(800), height: faker.random.number(800) },
  { width: faker.random.number(800), height: faker.random.number(800) },
  { width: faker.random.number(800), height: faker.random.number(800) },
  { width: faker.random.number(800), height: faker.random.number(800) },
  { width: faker.random.number(800), height: faker.random.number(800) },
  { width: faker.random.number(800), height: faker.random.number(800) },
  { width: faker.random.number(800), height: faker.random.number(800) },
  { width: faker.random.number(800), height: faker.random.number(800) },
  { width: faker.random.number(800), height: faker.random.number(800) },
  { width: faker.random.number(800), height: faker.random.number(800) },
  { width: faker.random.number(800), height: faker.random.number(800) },
  { width: faker.random.number(800), height: faker.random.number(800) },
  { width: faker.random.number(800), height: faker.random.number(800) },
  { width: faker.random.number(800), height: faker.random.number(800) },
  { width: faker.random.number(800), height: faker.random.number(800) },
  { width: faker.random.number(800), height: faker.random.number(800) },
];

const MockCards = [
  {
    id: 1,
    title: 'This is a long title for good and I dont know how to fix it',
    dateTime: faker.date.future(),
    cardType: 'doc',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[0].width,
    height: MockCardsSize[0].height,
    image: `https://picsum.photos/${MockCardsSize[0].width}/${MockCardsSize[0].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: 2,
    title: faker.random.words(),
    dateTime: faker.date.future(),
    cardType: 'xls',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[1].width,
    height: MockCardsSize[1].height,
    image: `https://picsum.photos/${MockCardsSize[1].width}/${MockCardsSize[1].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: 3,
    title: faker.random.words(),
    dateTime: faker.date.future(),
    cardType: 'doc',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[2].width,
    height: MockCardsSize[2].height,
    image: `https://picsum.photos/${MockCardsSize[2].width}/${MockCardsSize[2].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: 4,
    title: faker.random.words(),
    dateTime: faker.date.future(),
    cardType: 'doc',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[3].width,
    height: MockCardsSize[3].height,
    image: `https://picsum.photos/${MockCardsSize[3].width}/${MockCardsSize[3].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: 5,
    title: faker.random.words(),
    dateTime: faker.date.future(),
    cardType: 'doc',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[4].width,
    height: MockCardsSize[4].height,
    image: `https://picsum.photos/${MockCardsSize[4].width}/${MockCardsSize[4].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: 6,
    title: faker.random.words(),
    dateTime: faker.date.future(),
    cardType: 'doc',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[5].width,
    height: MockCardsSize[5].height,
    image: `https://picsum.photos/${MockCardsSize[5].width}/${MockCardsSize[5].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: 7,
    title: faker.random.words(),
    dateTime: faker.date.future(),
    cardType: 'doc',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[6].width,
    height: MockCardsSize[6].height,
    image: `https://picsum.photos/${MockCardsSize[6].width}/${MockCardsSize[6].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: 8,
    title: faker.random.words(),
    dateTime: faker.date.future(),
    cardType: 'doc',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[7].width,
    height: MockCardsSize[7].height,
    image: `https://picsum.photos/${MockCardsSize[7].width}/${MockCardsSize[7].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: 9,
    title: faker.random.words(),
    dateTime: faker.date.future(),
    cardType: 'doc',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[8].width,
    height: MockCardsSize[8].height,
    image: `https://picsum.photos/${MockCardsSize[8].width}/${MockCardsSize[8].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: 10,
    title: faker.random.words(),
    dateTime: faker.date.future(),
    cardType: 'doc',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[9].width,
    height: MockCardsSize[9].height,
    image: `https://picsum.photos/${MockCardsSize[9].width}/${MockCardsSize[9].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: 11,
    title: faker.random.words(),
    dateTime: faker.date.future(),
    cardType: 'doc',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[10].width,
    height: MockCardsSize[10].height,
    image: `https://picsum.photos/${MockCardsSize[10].width}/${MockCardsSize[10].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: 12,
    title: faker.random.words(),
    dateTime: faker.date.future(),
    cardType: 'doc',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[11].width,
    height: MockCardsSize[11].height,
    image: `https://picsum.photos/${MockCardsSize[11].width}/${MockCardsSize[11].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: 13,
    title: faker.random.words(),
    dateTime: faker.date.future(),
    cardType: 'doc',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[12].width,
    height: MockCardsSize[12].height,
    image: `https://picsum.photos/${MockCardsSize[12].width}/${MockCardsSize[12].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: 14,
    title: faker.random.words(),
    dateTime: faker.date.future(),
    cardType: 'doc',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[13].width,
    height: MockCardsSize[13].height,
    image: `https://picsum.photos/${MockCardsSize[13].width}/${MockCardsSize[13].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: 15,
    title: faker.random.words(),
    dateTime: faker.date.future(),
    cardType: 'doc',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[14].width,
    height: MockCardsSize[14].height,
    image: `https://picsum.photos/${MockCardsSize[14].width}/${MockCardsSize[14].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: 16,
    title: faker.random.words(),
    dateTime: faker.date.future(),
    cardType: 'doc',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[15].width,
    height: MockCardsSize[15].height,
    image: `https://picsum.photos/${MockCardsSize[15].width}/${MockCardsSize[15].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: 17,
    title: faker.random.words(),
    dateTime: faker.date.future(),
    cardType: 'doc',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[16].width,
    height: MockCardsSize[16].height,
    image: `https://picsum.photos/${MockCardsSize[16].width}/${MockCardsSize[16].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: 18,
    title: faker.random.words(),
    dateTime: faker.date.future(),
    cardType: 'doc',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[17].width,
    height: MockCardsSize[17].height,
    image: `https://picsum.photos/${MockCardsSize[17].width}/${MockCardsSize[17].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: 19,
    title: faker.random.words(),
    dateTime: faker.date.future(),
    cardType: 'doc',
    totalFavorites: faker.random.number(45),
    favorited: faker.random.boolean(),
    width: MockCardsSize[18].width,
    height: MockCardsSize[18].height,
    image: `https://picsum.photos/${MockCardsSize[18].width}/${MockCardsSize[18].height}`,
    link: faker.internet.url(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
];

/* eslint-disable */
const CardRenderer = ({ data }) => {
  return (
    <Card
      key={data.id}
      dateTime={data.dateTime}
      isFavorited={data.favorited}
      totalFavorites={data.totalFavorites}
      onClickFavorite={() => null}
      onClick={() => null}
      id={data.id}
      title={data.title}
      href={data.link}
      type={data.cardType}
      image={data.image}
      renderAvatar={() => {
        return (
          <Avatar
            size={1.6}
            firstName={data.user.firstName}
            lastName={data.user.lastName}
          />
        );
      }}
      navigationList={[
        {
          onClick: () => null,
          item: (
            <HorizontalGroup margin={1.6}>
              <Icon type="new-window" size={1.6} />
              <span>Open in New Window</span>
            </HorizontalGroup>
          ),
        },
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
/* eslint-enable */

const MockListItem = () => {
  return (
    <ListItem
      href="https://google.com"
      renderItem={() => <FileIcon type="doc" size={2.4} />}
      renderContent={() => (
        <ListItemContent
          renderItem={() => (
            <Avatar firstName="Brian" lastName="Jenkins" size={4} />
          )}
          primary="How To Memorize Music 5 Times Faster"
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

const CardView = props => {
  const location = useLocation();
  const [cardCategory, setCardCategory] = useState('all');
  const [viewType, setViewType] = useLocalStorage(
    `card-view-location:${location.pathname}`,
    'thumbnail'
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
        {viewType === 'thumbnail' && (
          <Masonry
            // Provides the data for our grid items
            items={MockCards}
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
        {viewType === 'row' && (
          <List>
            <MockListItem />
            <MockListItem />
            <MockListItem />
            <MockListItem />
            <MockListItem />
            <MockListItem />
            <MockListItem />
            <MockListItem />
            <MockListItem />
          </List>
        )}
      </div>
    </div>
  );
};

export default CardView;
