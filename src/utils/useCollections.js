import { useMutation, useQueryClient } from 'react-query';
import { upsertCollection } from './collectionClient';

export const generalCardQueryKey = 'cards';

const useCollections = () => {
  const queryClient = useQueryClient();
  const {
    mutate: collectionMutate,
    isLoading: collectionIsLoading,
  } = useMutation(upsertCollection, {
    onMutate: async newCollection => {
      await queryClient.cancelQueries('collections');
      const previousCollections = queryClient.getQueryData('collections') ?? {
        data: [],
      };
      const newCollections = [
        {
          description: '',
          title: newCollection.title,
          id: newCollection.id,
        },
        ...previousCollections.data,
      ];

      queryClient.setQueryData('collections', () => ({
        data: newCollections,
      }));
      return () => queryClient.setQueryData('collections', previousCollections);
    },
    onError: (error, newCollection, rollback) => rollback(),
    onSuccess: () => queryClient.invalidateQueries('collections'),
  });

  return {
    collectionMutate,
    collectionIsLoading,
  };
};

export default useCollections;
