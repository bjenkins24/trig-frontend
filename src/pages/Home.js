import React from 'react';
import styled from 'styled-components';
import { Tabs } from '@trig-app/core-components/dist/compositions';
import { Carousel, Deck } from '@trig-app/core-components';
import { useWindowWidth } from '@react-hook/window-size/throttled';
import { breakpoints } from '@trig-app/constants';
import Hero from '../components/Hero';
import Content from '../components/Content';
import CardView from '../components/CardView';
import Filters from '../components/Filters';

const Item = styled.div`
  height: 204px;
  width: 100%;
`;

const MockDeck = () => (
  <Item>
    <Deck
      user={{
        firstName: 'Brian',
        lastName: 'Jenkins',
        position: 'President, CEO',
      }}
      image="https://code.org/images/fill-480x360/tutorials/hoc2018/danceparty-characters.jpg"
      totalFollowers={9}
      totalCards={22}
      title="Onboarding Support"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea"
    />
  </Item>
);

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
      <Hero
        css={`
          margin-bottom: ${({ theme }) => theme.space[5] + theme.space[1]}px;
        `}
      >
        <Tabs
          variant="dark"
          tabs={[
            { text: 'All Decks' },
            { text: 'My Decks' },
            { text: 'Engineering' },
            { text: 'Sales' },
            { text: 'Support' },
          ]}
          tabPanels={[
            <div
              css={`
                margin-left: -4.375%;
                width: calc(100% + 8.75%);
              `}
            >
              <Carousel slidesPerPage={getSlidesPerPage()}>
                <MockDeck />
                <MockDeck />
                <MockDeck />
                <MockDeck />
                <MockDeck />
                <MockDeck />
                <MockDeck />
                <MockDeck />
                <MockDeck />
                <MockDeck />
                <MockDeck />
                <MockDeck />
              </Carousel>
            </div>,
            'my decks',
            'development',
            'sales',
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
        <Filters>Filters</Filters>
      </Content>
    </div>
  );
};

export default Home;
