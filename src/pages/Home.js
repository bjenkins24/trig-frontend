import React from 'react';
import PropTypes from 'prop-types';
import { useWindowWidth } from '@react-hook/window-size/throttled';
import { Carousel, Loading, Collection } from '@trig-app/core-components';
import { useQuery } from 'react-query';
import { breakpoints } from '@trig-app/constants';
import { useHistory } from 'react-router-dom';
import Head from '../components/Head';
import Hero from '../components/Hero';
import Cards from '../components/Cards';
import { getCollections } from '../utils/collectionClient';

const getSlidesPerPage = ({ width }) => {
  if (width <= breakpoints.sm) {
    return 1;
  }
  if (width > breakpoints.sm && width <= breakpoints.md) {
    return 2;
  }
  if (width > breakpoints.md && width <= breakpoints.lg) {
    return 4;
  }
  if (width > breakpoints.lg && width <= breakpoints.xl) {
    return 5;
  }
  if (width > breakpoints.xl) {
    return 7;
  }
  return 5;
};

const HomeProps = {
  setIsCreateLinkOpen: PropTypes.func.isRequired,
};

const Home = ({ setIsCreateLinkOpen }) => {
  const width = useWindowWidth();
  const history = useHistory();

  const { data: collections, isLoading } = useQuery(`collections`, () =>
    getCollections()
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Head title="Dashboard" />
      <Hero
        css={`
          margin-bottom: ${({ theme }) => theme.space[5] + theme.space[1]}px;
        `}
      >
        {typeof collections !== 'undefined' && (
          <Carousel
            slidesPerPage={getSlidesPerPage({ width })}
            defaultSlidesToScroll={getSlidesPerPage({ width })}
          >
            {collections.data.map(data => {
              return (
                <div
                  css={`
                    height: 204px;
                    width: 100%;
                  `}
                >
                  <Collection
                    onClick={() => {
                      history.push(`/collection/${data.token}`);
                    }}
                    href={`/collection/${data.token}`}
                    totalCards={data.totalCards}
                    title={data.title}
                    permission={
                      typeof data.permissions !== 'undefined' &&
                      data.permissions.length === 0
                        ? 'private'
                        : 'public'
                    }
                  />
                </div>
              );
            })}
          </Carousel>
        )}
      </Hero>

      <Cards setIsCreateLinkOpen={setIsCreateLinkOpen} />
    </div>
  );
};

Home.propTypes = HomeProps;

export default Home;
