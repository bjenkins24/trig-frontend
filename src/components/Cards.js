import React from 'react';
import PropTypes from 'prop-types';
import Content from './Content';
import CardView from './CardView';
import Filters from './Filters';
import useFilters from '../utils/useFilters';
import useCards, { CardQueryContext } from '../utils/useCards';

const CardProps = {
  setIsCreateLinkOpen: PropTypes.func.isRequired,
  collectionId: PropTypes.string,
};

const defaultProps = {
  collectionId: null,
};

const Cards = ({ setIsCreateLinkOpen, collectionId, ...restProps }) => {
  const { queryString, filterProps, cardViewProps } = useFilters();
  let finalQueryString = queryString;
  if (collectionId) {
    if (finalQueryString) {
      finalQueryString = `col=${collectionId}&${queryString}`;
    } else {
      finalQueryString = `col=${collectionId}`;
    }
  }
  const {
    cards,
    filters,
    isLoading,
    cardQueryKey,
    fetchNextPage,
    isFetchingNextPage,
    totalResults,
  } = useCards({
    queryString: finalQueryString,
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
            isFetchingNextPage={isFetchingNextPage}
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
Cards.defaultProps = defaultProps;

export default Cards;
