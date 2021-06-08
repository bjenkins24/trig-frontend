import { client } from './apiClient';

const createCard = fields => {
  return client('card', {
    body: { ...fields },
  });
};

const updateCard = fields => {
  if (typeof fields.id === 'undefined') {
    // eslint-disable-next-line no-console
    return console.error(
      'You must specify and id field if you are updating a card'
    );
  }
  return client(`card/${fields.id}`, {
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
