import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  deleteCollection,
  getCollections,
  upsertCollection,
} from './collectionClient';

export const generalCardQueryKey = 'cards';

const useCollections = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();
  const {
    mutate: collectionMutate,
    isLoading: collectionIsLoading,
  } = useMutation(upsertCollection, {
    onError: (error, newCollection, rollback) => rollback(),
    onSuccess: () => {
      queryClient.invalidateQueries('collections');
      onSuccess();
    },
  });

  const {
    mutate: collectionDelete,
    isLoading: collectionDeleteIsLoading,
  } = useMutation(deleteCollection, {
    onError: (error, newCollection, rollback) => rollback(),
    onSuccess: () => {
      queryClient.invalidateQueries('collections');
      onSuccess();
    },
  });

  const {
    data: collections,
    isLoading: isLoadingCollections,
  } = useQuery(`collections`, () => getCollections());

  return {
    collections,
    isLoadingCollections,
    collectionMutate,
    collectionIsLoading,
    collectionDelete,
    collectionDeleteIsLoading,
  };
};

export default useCollections;
