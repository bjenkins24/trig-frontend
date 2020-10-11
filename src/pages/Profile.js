import React from 'react';
import {
  Avatar,
  VerticalGroup,
  Heading1,
  Body1,
  Body2,
  HorizontalGroup,
  Button,
} from '@trig-app/core-components';
import { TabsNavigation } from '@trig-app/core-components/dist/compositions';
import faker from 'faker';
import Hero from '../components/Hero';
import Head from '../components/Head';
import { heroContentMaxWidth } from '../utils/constants';
import Cards from '../components/Cards';

const user = {
  id: 1,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  image: faker.image.avatar(),
  email: faker.internet.email(),
  position: faker.name.jobTitle(),
};

const totalCards = 245;
const totalCollections = 24;

const Profile = () => {
  return (
    <>
      <Head title={`${user.firstName} ${user.lastName}`} />
      <Hero
        css={`
          padding-top: ${({ theme }) => theme.space[5]}px;
          padding-bottom: 0;
        `}
      >
        <div
          css={`
            margin: 0 auto;
            max-width: ${heroContentMaxWidth}px;
            position: relative;
          `}
        >
          <HorizontalGroup margin={3.2}>
            <Avatar
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              image={user.image}
              size={15}
              css={`
                position: absolute;
                bottom: -${({ theme }) => theme.space[4]}px;
                box-shadow: ${({ theme }) => theme.sh};
              `}
            />
            <HorizontalGroup
              margin={6.4}
              css={`
                margin-left: ${({ theme }) => theme.space[4] + 150}px;
                margin-bottom: ${({ theme }) => theme.space[3]}px;
              `}
            >
              <div>
                <Heading1
                  color="pc"
                  css={`
                    margin-bottom: ${({ theme }) => theme.space[1]}px;
                  `}
                >
                  {user.firstName} {user.lastName}
                </Heading1>
                <Body1 color="pc">{user.position}</Body1>
              </div>
              <HorizontalGroup
                margin={2.4}
                css={`
                  margin-top: ${({ theme }) =>
                    theme.space[2] + theme.space[1]}px;
                `}
              >
                <VerticalGroup>
                  <Body2 color="pc" weight="bold">
                    {totalCards}
                  </Body2>
                  <Body2 color="ps.200">Cards</Body2>
                </VerticalGroup>
                <VerticalGroup>
                  <Body2 color="pc" weight="bold">
                    {totalCollections}
                  </Body2>
                  <Body2 color="ps.200">Collections</Body2>
                </VerticalGroup>
              </HorizontalGroup>
            </HorizontalGroup>
            <div
              css={`
                margin-left: auto;
              `}
            >
              <Button
                iconProps={{ type: 'lock' }}
                css={`
                  margin-left: auto;
                `}
              >
                Share
              </Button>
            </div>
          </HorizontalGroup>
        </div>
      </Hero>
      <div
        css={`
          position: relative;
        `}
      >
        <div
          css={`
            position: absolute;
            top: 123px;
            background: ${({ theme }) => theme.colors.ps[50]};
            width: 100%;
            height: 2px;
          `}
        />
      </div>
      <div
        css={`
          max-width: ${heroContentMaxWidth}px;
          margin: 0 auto;
          margin-top: ${({ theme }) => theme.space[4]}px;
        `}
      >
        <TabsNavigation
          variant="light"
          size="lg"
          tabs={[
            { text: 'Cards' },
            { text: 'Collections' },
            { text: 'Settings' },
          ]}
          tabPanels={[
            <Cards />,
            <div>Collections</div>,
            <Heading1>YOU FOUND IT CHANGE YOUR PASSWORD NOW</Heading1>,
          ]}
        />
      </div>
    </>
  );
};

export default Profile;
