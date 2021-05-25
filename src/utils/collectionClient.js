import { client } from './apiClient';

const createCollection = fields => {
  return client('collection', {
    body: { ...fields },
  });
};

const updateCollection = fields => {
  if (typeof fields.id === 'undefined') {
    // eslint-disable-next-line no-console
    return console.error(
      'You must specify and id field if you are updating a collection'
    );
  }
  return client(`collection/${fields.id}`, {
    method: 'PATCH',
    body: { ...fields },
  });
};

const deleteCollection = ({ id }) => {
  return client(`collection/${id}`, {
    method: 'DELETE',
  });
};

const getCollection = ({ token }) => {
  return client(`collection/${token}`);
};

const getCollections = () => {
  return client(`collections`);
};

export {
  createCollection,
  updateCollection,
  getCollection,
  getCollections,
  deleteCollection,
};
