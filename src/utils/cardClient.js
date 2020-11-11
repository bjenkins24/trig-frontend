import { client } from './apiClient';

const createCard = fields => {
  return client('card', {
    body: { ...fields },
  });
};

const getCards = () => {
  return client('cards');
};

export { createCard, getCards };
