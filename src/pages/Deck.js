import React from 'react';
import { useParams } from 'react-router-dom';
import Head from '../components/Head';
import Hero from '../components/Hero';
import CardView from '../components/CardView';
import Filters from '../components/Filters';
import Content from '../components/Content';

const Deck = () => {
  const { id } = useParams();
  return (
    <>
      <Head title={`Deck ${id}`} />
      <Hero>Description stuff</Hero>
      <Content>
        <CardView
          css={`
            margin-right: ${({ theme }) => theme.space[5]}px;
          `}
          location="/"
        />
        <Filters />
      </Content>
    </>
  );
};

export default Deck;
