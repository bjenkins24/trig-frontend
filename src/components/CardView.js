import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonToggle,
  Icon,
  SelectField,
  List,
  ListItem,
  ListItemContent,
  FileIcon,
  Avatar,
} from '@trig-app/core-components';
import useLocalStorage from '../utils/useLocalStorage';

const CardViewProps = {
  location: PropTypes.string.isRequired,
};

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

const CardView = ({ location, ...restProps }) => {
  const [cardCategory, setCardCategory] = useState('all');
  const [viewType, setViewType] = useLocalStorage(
    `card-view-location:${location}`,
    'thumbnail'
  );

  return (
    <div
      css={`
        width: 700px;
      `}
      {...restProps}
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
      <div>
        {viewType === 'thumbnail' && <div>Cards</div>}
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

CardView.propTypes = CardViewProps;

export default CardView;
