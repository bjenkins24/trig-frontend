import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  Heading1,
  Body1,
  Avatar,
  Icon,
  Body2,
  Button,
  Image,
  ListItemContent,
} from '@trig-app/core-components';
import faker from 'faker';
import Head from '../components/Head';
import Hero from '../components/Hero';
import CardView from '../components/CardView';
import Filters from '../components/Filters';
import Content from '../components/Content';

const Collection = () => {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  const data = useMemo(
    () => ({
      description: faker.lorem.paragraph(),
      user: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        position: faker.name.jobTitle(),
      },
      totalFollowers: faker.random.number(999),
      totalCards: faker.random.number(999),
      title: faker.random.words(),
      image: 'https://picsum.photos/829/376',
    }),
    []
  );

  return (
    <>
      <Head title={`Collection ${id}`} />
      <Hero
        css={`
          margin-bottom: ${({ theme }) => theme.space[5] + theme.space[1]}px;
        `}
      >
        <div
          css={`
            display: flex;
            max-width: 1600px;
            margin: 0 auto;
          `}
        >
          <div
            css={`
              width: 820px;
              height: 376px;
              margin-right: ${({ theme }) => theme.space[5]}px;
            `}
          >
            <Image
              src={data.image}
              alt={data.title}
              width="829"
              height="376"
              css={`
                border: 1px solid ${({ theme }) => theme.colors.ps[300]};
                border-radius: ${({ theme }) => theme.br};
              `}
            />
          </div>
          <div>
            <Heading1 color="pc">{data.title}</Heading1>
            <Body1 as="p" color="pc">
              {data.description}
            </Body1>
            <div
              css={`
                display: flex;
                margin-bottom: ${({ theme }) => theme.space[3]}px;
              `}
            >
              <ListItemContent
                variant="dark"
                size="sm"
                renderItem={() => (
                  <Avatar
                    firstName={data.user.firstName}
                    lastName={data.user.lastName}
                    size={4}
                  />
                )}
                primary={`${data.user.firstName} ${data.user.lastName}`}
                secondary={data.user.position}
              />
              <div
                css={`
                  display: flex;
                  margin-left: auto;
                  align-self: center;
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
            <div
              css={`
                background: ${({ theme }) => theme.colors.ps[300]};
                width: 100%;
                height: 1px;
                margin-bottom: ${({ theme }) => theme.space[3]}px;
              `}
            />
            <div
              css={`
                display: flex;
              `}
            >
              <Button iconProps={{ type: 'lock' }}>Share</Button>
              <div
                css={`
                  margin-left: auto;
                `}
              >
                <Button
                  countTotal={followerCount}
                  onClick={() => {
                    setIsFollowing(!isFollowing);
                    if (isFollowing) {
                      setFollowerCount(followerCount - 1);
                    } else {
                      setFollowerCount(followerCount + 1);
                    }
                  }}
                >
                  {!isFollowing ? 'Follow' : 'Following'}
                </Button>
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

export default Collection;
