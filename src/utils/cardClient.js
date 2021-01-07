import { client } from './apiClient';

const createCard = fields => {
  return client('card', {
    body: { ...fields },
  });
};

const updateCard = fields => {
  return client('card', {
    method: 'PATCH',
    body: { ...fields },
  });
};

const deleteCard = ({ id }) => {
  return client(`card/${id}`, {
    method: 'DELETE',
  });
};

const getCards = ({ queryKey, pageParam = 0 }) => {
  return client(`${queryKey}&p=${pageParam}`);
};

export { createCard, updateCard, getCards, deleteCard };
