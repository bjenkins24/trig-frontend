import get from 'lodash/get';
import { useInfiniteQuery } from 'react-query';
import { createContext } from 'react';
import { getCards } from './cardClient';

export const generalCardQueryKey = 'cards';
export const CardQueryContext = createContext('cards');

const useCards = ({ queryString, queryConfig }) => {
  const queryKey = `${generalCardQueryKey}?${queryString}`;
  const {
    data: cards,
    isLoading,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    queryKey,
    ({ pageParam }) => getCards({ queryKey, pageParam }),
    {
      ...queryConfig,
      getNextPageParam: lastPage => lastPage.meta.page + 1,
    }
  );

  return {
    cardQueryKey: `${generalCardQueryKey}?${queryString}`,
    isLoading,
    fetchCards: refetch,
    cards: get(cards, 'pages', []).reduce((accumulator, page) => {
      return [...accumulator, ...page.data];
    }, []),
    filters: get(cards, 'pages.0.filters', { tags: [], types: [] }),
    meta: get(cards, `pages.${get(cards, 'pages', []).length - 1}`, []),
    totalResults: parseInt(get(cards, 'pages.0.meta.total_results', 0), 10),
    fetchNextPage,
    isFetchingNextPage,
  };
};

export default useCards;
