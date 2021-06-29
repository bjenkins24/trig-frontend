import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Heading1,
  Icon,
  Body2,
  Body1,
  Button,
  Loading,
} from '@trig-app/core-components';
import Head from '../components/Head';
import Hero from '../components/Hero';
import Header from '../components/Header';
import Cards from '../components/Cards';
import { getCollection } from '../utils/collectionClient';
import CollectionModal from '../components/CollectionModal';
import Search from './Search';
import useSearch from '../utils/useSearch';
import { track } from '../utils/track';

const CollectionProps = {
  setIsCreateLinkOpen: PropTypes.func,
  isPublic: PropTypes.bool,
  defaultToken: PropTypes.string,
};

const defaultProps = {
  setIsCreateLinkOpen: () => null,
  isPublic: false,
  defaultToken: '',
};

const Collection = ({ setIsCreateLinkOpen, isPublic, defaultToken }) => {
  let { token } = useParams();
  if (!token) {
    token = defaultToken;
  }
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const { isSearchOpen, openSearch, closeSearch, searchKey } = useSearch();

  const { data: collection, isLoading } = useQuery(
    `collection/${token}`,
    () => getCollection({ token }),
    {
      onError: error => {
        if (error.error === 'forbidden') {
          window.location = '/';
        }
      },
      retry: 0,
    }
  );

  useEffect(() => {
    track('User Views Collection', {
      isAuthenticated: !isPublic,
      token,
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {!isPublic && (
        <CollectionModal
          heading="Edit Collection"
          content="You can edit your collection and add cards to it and share it publicly."
          isOpen={isCollectionModalOpen}
          onRequestClose={() => setIsCollectionModalOpen(false)}
          defaultTitle={collection.data.title}
          defaultDescription={collection.data.description}
          defaultSharing={
            collection.data.permissions.length > 0 ? 'public' : 'private'
          }
          submitContent="Save"
          successMessage="Your collection was saved successfully."
          id={collection.data.id}
        />
      )}
      <Head title={collection.data.title} />
      {isPublic && isSearchOpen && (
        <Search
          defaultInput={searchKey}
          onRequestClose={closeSearch}
          collectionId={collection.data.id}
          isPublic={isPublic}
        />
      )}
      {isPublic && <Header isPublic={isPublic} openSearch={openSearch} />}
      <Hero
        css={`
          margin-bottom: ${({ theme }) => theme.space[5] + theme.space[1]}px;
        `}
      >
        <div
          css={`
            display: flex;
            max-width: 1200px;
            margin: 0 auto;
          `}
        >
          <Heading1
            css={`
              margin: 0;
            `}
            color="pc"
          >
            {collection.data.title}
          </Heading1>
          <div
            css={`
              margin-left: auto;
              display: flex;
            `}
          >
            <div
              css={`
                display: flex;
                align-self: center;
                margin-right: ${({ theme }) => theme.space[4]}px;
              `}
            >
              <Icon
                type="cards"
                color="pc"
                size={2.4}
                css={`
                  margin-right: ${({ theme }) => theme.space[2]}px;
                `}
              />
              <Body2 color="pc">
                {collection.data.total_cards} card
                {collection.data.total_cards !== 1 && 's'}
              </Body2>
            </div>
            {!isPublic && (
              <Button
                css={`
                  margin-left: auto;
                  margin-right: ${({ theme }) => theme.space[4]}px;
                `}
                iconProps={{ type: 'edit' }}
                onClick={() => {
                  setIsCollectionModalOpen(true);
                }}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
        {collection.data.description && (
          <div
            css={`
              margin: 0 auto;
              max-width: 1200px;
            `}
          >
            <p
              css={`
                margin-bottom: 0;
                max-width: 700px;
              `}
            >
              <Body1 color="pc">{collection.data.description}</Body1>
            </p>
          </div>
        )}
      </Hero>
      <Cards
        isPublic={isPublic}
        setIsCreateLinkOpen={setIsCreateLinkOpen}
        collectionId={collection.data.id}
        hiddenTags={collection.data.hidden_tags}
      />
    </>
  );
};

Collection.propTypes = CollectionProps;
Collection.defaultProps = defaultProps;

export default Collection;
