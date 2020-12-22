import React from 'react';
import Content from './Content';
import CardView from './CardView';
import Filters from './Filters';
import useFilters from '../utils/useFilters';
import useCards, { CardQueryContext } from '../utils/useCards';

const Cards = props => {
  const { queryString, filterProps } = useFilters();
  const { cards, filters, isLoading, cardQueryKey } = useCards({ queryString });

  return (
    <Content
      css={`
        margin-top: ${({ theme }) => theme.space[5]}px;
      `}
      {...props}
    >
      <CardQueryContext.Provider value={cardQueryKey}>
        <CardView
          cards={cards}
          isLoading={isLoading}
          css={`
            margin-right: ${({ theme }) => theme.space[5]}px;
          `}
        />
        <Filters tags={filters.tags} types={filters.types} {...filterProps} />
      </CardQueryContext.Provider>
    </Content>
  );
};

export default Cards;
