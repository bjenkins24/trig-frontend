import get from 'lodash/get';
import { useQuery } from 'react-query';
import { createContext } from 'react';
import { getCards } from './cardClient';

export const generalCardQueryKey = 'cards';
export const CardQueryContext = createContext('cards');

const useCards = ({ queryString, queryConfig }) => {
  const queryKey = `${generalCardQueryKey}?${queryString}`;
  const { data: cards, isLoading, refetch } = useQuery(
    queryKey,
    () => getCards(queryKey),
    queryConfig
  );

  return {
    cardQueryKey: `${generalCardQueryKey}?${queryString}`,
    isLoading,
    fetchCards: refetch,
    cards: get(cards, 'data', []),
    filters: get(cards, 'filters', { tags: [], types: [] }),
    meta: get(cards, 'meta', {}),
    totalResults: parseInt(get(cards, 'meta.totalResults', 0), 10),
  };
};

export default useCards;
