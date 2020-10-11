import React from 'react';
import Content from './Content';
import CardView from './CardView';
import Filters from './Filters';

const Cards = props => {
  return (
    <Content {...props}>
      <CardView
        css={`
          margin-right: ${({ theme }) => theme.space[5]}px;
        `}
      />
      <Filters />
    </Content>
  );
};

export default Cards;
