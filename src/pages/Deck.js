import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Heading1,
  Body1,
  Avatar,
  Icon,
  Body2,
} from '@trig-app/core-components';
import faker from 'faker';
import Head from '../components/Head';
import Hero from '../components/Hero';
import CardView from '../components/CardView';
import Filters from '../components/Filters';
import Content from '../components/Content';

const Deck = () => {
  const { id } = useParams();

  const data = {
    description: faker.lorem.paragraph(),
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      position: faker.name.jobTitle(),
    },
    totalFollowers: faker.random.number(999),
    totalCards: faker.random.number(999),
    title: faker.random.words(),
    image: faker.image.imageUrl(),
  };

  return (
    <>
      <Head title={`Deck ${id}`} />
      <Hero
        css={`
          margin-bottom: ${({ theme }) => theme.space[5] + theme.space[1]}px;
        `}
      >
        <div
          css={`
            display: flex;
          `}
        >
          <img
            src={data.image}
            alt={data.title}
            css={`
              border-radius: ${({ theme }) => theme.br};
              margin-right: ${({ theme }) => theme.space[4]}px;
              border: 1px solid ${({ theme }) => theme.colors.ps[300]};
            `}
          />
          <div>
            <Heading1 color="pc">{data.title}</Heading1>
            <Body1 as="p" color="pc">
              {data.description}
            </Body1>
            <div
              css={`
                display: flex;
              `}
            >
              <Avatar
                firstName={data.user.firstName}
                lastName={data.user.lastName}
              />
              <div
                css={`
                  display: flex;
                  margin-left: auto;
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
                <Body2 color="pc">{data.totalCards} cards</Body2>
              </div>
            </div>
          </div>
        </div>
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
    </>
  );
};

export default Deck;
