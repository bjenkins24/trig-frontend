import React from 'react';
import PropTypes from 'prop-types';
import { useWindowWidth } from '@react-hook/window-size/throttled';
import { Carousel, Loading, Collection } from '@trig-app/core-components';
import { breakpoints } from '@trig-app/constants';
import { useHistory } from 'react-router-dom';
import Head from '../components/Head';
import Hero from '../components/Hero';
import Cards from '../components/Cards';
import useCollections from '../utils/useCollections';

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

  const { collections, isLoadingCollections } = useCollections();

  if (isLoadingCollections) {
    return <Loading />;
  }

  return (
    <div>
      <Head title="Dashboard" />

      {typeof collections !== 'undefined' && collections.data.length > 0 && (
        <Hero
          css={`
            padding-left: 0;
            padding-right: 0;
            margin-bottom: ${({ theme }) => theme.space[5] + theme.space[1]}px;
          `}
        >
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
                  key={data.token}
                >
                  <Collection
                    onClick={() => {
                      history.push(`/collection/${data.token}`);
                    }}
                    href={`/collection/${data.token}`}
                    totalCards={data.total_cards}
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
        </Hero>
      )}

      <Cards setIsCreateLinkOpen={setIsCreateLinkOpen} />
    </div>
  );
};

Home.propTypes = HomeProps;

export default Home;
