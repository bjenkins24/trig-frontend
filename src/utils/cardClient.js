import { client } from './apiClient';

const createCard = fields => {
  return client('card', {
    body: { ...fields },
  });
};

const updateCard = fields => {
  return client('card', {
    method: 'PUT',
    body: { ...fields },
  });
};

const getCards = () => {
  return client('cards');
};

export { createCard, updateCard, getCards };
