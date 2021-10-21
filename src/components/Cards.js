import React from 'react';
import PropTypes from 'prop-types';
import Content from './Content';
import CardView from './CardView';
import Filters from './Filters';
import useFilters from '../utils/useFilters';
import useCards, { CardQueryContext } from '../utils/useCards';

const CardProps = {
  setIsCreateLinkOpen: PropTypes.func.isRequired,
  collectionId: PropTypes.number,
  isPublic: PropTypes.bool,
  hiddenTags: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  collectionId: null,
  isPublic: false,
  hiddenTags: [],
};

const Cards = ({
  setIsCreateLinkOpen,
  collectionId,
  isPublic,
  hiddenTags,
  ...restProps
}) => {
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

  const tags = filters.tags.filter(tag => {
    return !hiddenTags.includes(tag.name);
  });

  return (
    <>
      <Content
        css={`
          margin-top: ${({ theme }) => theme.space[5]}px;
        `}
        {...restProps}
      >
        <div
          css={`
            display: flex;
            margin: 0 auto;
          `}
        >
          <CardQueryContext.Provider value={cardQueryKey}>
            <CardView
              isPublic={isPublic}
              setIsCreateLinkOpen={setIsCreateLinkOpen}
              cards={cards}
              totalResults={totalResults}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              isLoading={isLoading}
              css={`
                margin-right: ${({ theme }) => theme.space[5]}px;
              `}
              selectedTags={filterProps.selectedTags}
              {...cardViewProps}
            />
            <Filters
              isPublic={isPublic}
              tags={tags}
              types={filters.types}
              {...filterProps}
            />
          </CardQueryContext.Provider>
        </div>
      </Content>
    </>
  );
};

Cards.propTypes = CardProps;
Cards.defaultProps = defaultProps;

export default Cards;
