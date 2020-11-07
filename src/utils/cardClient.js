import { client } from './apiClient';

const createCard = fields => {
  return client('/card', {
    body: { ...fields },
  });
};

export { createCard };
