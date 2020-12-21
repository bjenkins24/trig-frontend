import get from 'lodash/get';
import { useQuery } from 'react-query';
import { getCards } from './cardClient';

export const generalCardQueryKey = 'cards';

const useCards = ({ queryString, queryConfig }) => {
  const { data: cards, isLoading, refetch } = useQuery(
    `${generalCardQueryKey}?${queryString}`,
    getCards,
    queryConfig
  );

  return {
    cardQueryKey: generalCardQueryKey,
    isLoading,
    fetchCards: refetch,
    cards: get(cards, 'data', []),
    filters: get(cards, 'filters', { tags: [], types: [] }),
    meta: get(cards, 'meta', {}),
    totalResults: parseInt(get(cards, 'meta.totalResults', 0), 10),
  };
};

export default useCards;
