import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Heading1,
  Icon,
  Body2,
  Button,
  Loading,
} from '@trig-app/core-components';
import Head from '../components/Head';
import Hero from '../components/Hero';
import Cards from '../components/Cards';
import { getCollection } from '../utils/collectionClient';

const CollectionProps = {
  setIsCreateLinkOpen: PropTypes.func.isRequired,
};

const Collection = ({ setIsCreateLinkOpen }) => {
  const { token } = useParams();

  const { data: collection, isLoading } = useQuery(`collection/${token}`, () =>
    getCollection({ token })
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head title={collection.data.title} />
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
                {collection.data.totalCards} card
                {collection.data.totalCards !== 1 && 's'}
              </Body2>
            </div>
            <Button
              css={`
                margin-left: auto;
              `}
              iconProps={{ type: 'edit' }}
            >
              Edit
            </Button>
          </div>
        </div>
      </Hero>
      <Cards
        setIsCreateLinkOpen={setIsCreateLinkOpen}
        collectionId={collection.data.id}
      />
    </>
  );
};

Collection.propTypes = CollectionProps;

export default Collection;
