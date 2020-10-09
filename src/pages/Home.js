import React from 'react';
import styled from 'styled-components';
import { Tabs } from '@trig-app/core-components/dist/compositions';
import { Carousel, Collection } from '@trig-app/core-components';
import { useWindowWidth } from '@react-hook/window-size/throttled';
import { breakpoints } from '@trig-app/constants';
import { useHistory } from 'react-router-dom';
import faker from 'faker';
import Head from '../components/Head';
import Hero from '../components/Hero';
import Content from '../components/Content';
import CardView from '../components/CardView';
import Filters from '../components/Filters';

const Item = styled.div`
  height: 204px;
  width: 100%;
`;

const buildCollection = id => {
  return {
    id,
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      position: faker.name.jobTitle(),
    },
    image: `https://picsum.photos/${faker.random.number(
      800
    )}/${faker.random.number(800)}`,
    totalFollowers: faker.random.number(1000),
    totalCards: faker.random.number(999),
    title: faker.random.words(),
    description: faker.lorem.paragraph(),
  };
};

const mockCollections = [
  buildCollection(1),
  buildCollection(2),
  buildCollection(3),
  buildCollection(4),
  buildCollection(5),
  buildCollection(6),
  buildCollection(7),
  buildCollection(8),
  buildCollection(9),
  buildCollection(10),
  buildCollection(11),
  buildCollection(12),
];

/* eslint-disable */
const MockCollection = ({ data }) => {
  const history = useHistory();
  return (
    <Item>
      <Collection
        onClick={() => {
          history.push(`/collection/${data.id}`);
        }}
        href={`/collection/${data.id}`}
        user={data.user}
        image={data.image}
        totalFollowers={data.totalFollowers}
        totalCards={data.totalCards}
        title={data.title}
        description={data.description}
      />
    </Item>
  );
};
/* eslint-enable */

const Home = () => {
  const width = useWindowWidth();
  const getSlidesPerPage = () => {
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

  return (
    <div>
      <Head title="Dashboard" />
      <Hero
        css={`
          margin-bottom: ${({ theme }) => theme.space[5] + theme.space[1]}px;
        `}
      >
        <Tabs
          variant="dark"
          tabs={[
            { text: 'All Collections' },
            { text: 'My Collections' },
            { text: 'Engineering' },
            { text: 'Sales' },
            { text: 'Support' },
          ]}
          tabPanels={[
            <div
              css={`
                margin-left: -4.375%;
                width: calc(100% + 8.743%);
              `}
            >
              <Carousel
                slidesPerPage={getSlidesPerPage()}
                defaultSlidesToScroll={getSlidesPerPage()}
              >
                {mockCollections.map(collection => {
                  return (
                    <MockCollection key={collection.id} data={collection} />
                  );
                })}
              </Carousel>
            </div>,
            'my collections',
            'development',
            'sales',
            'support',
          ]}
        />
      </Hero>
      <Content>
        <CardView
          css={`
            margin-right: ${({ theme }) => theme.space[5]}px;
          `}
          location="/"
        />
        <Filters />
      </Content>
    </div>
  );
};

export default Home;
