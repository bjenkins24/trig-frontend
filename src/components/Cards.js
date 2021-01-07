import React from 'react';
import PropTypes from 'prop-types';
import Content from './Content';
import CardView from './CardView';
import Filters from './Filters';
import useFilters from '../utils/useFilters';
import useCards, { CardQueryContext } from '../utils/useCards';

const CardProps = {
  setIsCreateLinkOpen: PropTypes.func.isRequired,
};

const Cards = ({ setIsCreateLinkOpen, ...restProps }) => {
  const { queryString, filterProps, cardViewProps } = useFilters();
  const {
    cards,
    filters,
    isLoading,
    cardQueryKey,
    fetchNextPage,
    totalResults,
  } = useCards({
    queryString,
    // queryConfig: { refetchInterval: 5000 },
  });

  return (
    <>
      <Content
        css={`
          margin-top: ${({ theme }) => theme.space[5]}px;
        `}
        {...restProps}
      >
        <CardQueryContext.Provider value={cardQueryKey}>
          <CardView
            setIsCreateLinkOpen={setIsCreateLinkOpen}
            cards={cards}
            totalResults={totalResults}
            fetchNextPage={fetchNextPage}
            isLoading={isLoading}
            css={`
              margin-right: ${({ theme }) => theme.space[5]}px;
            `}
            {...cardViewProps}
          />
          <Filters tags={filters.tags} types={filters.types} {...filterProps} />
        </CardQueryContext.Provider>
      </Content>
    </>
  );
};

Cards.propTypes = CardProps;

export default Cards;
