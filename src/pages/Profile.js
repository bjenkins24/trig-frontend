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
import { useParams } from 'react-router-dom';
import faker from 'faker';
import Hero from '../components/Hero';
import Head from '../components/Head';
import { heroContentMaxWidth } from '../utils/constants';
import Cards from '../components/Cards';

const data = [
  {
    id: 1,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: faker.name.jobTitle(),
    email: faker.internet.email(),
    profilePicture: faker.image.avatar(),
  },
  {
    id: 2,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: faker.name.jobTitle(),
    email: faker.internet.email(),
    profilePicture: faker.image.avatar(),
  },
  {
    id: 3,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: faker.name.jobTitle(),
    email: faker.internet.email(),
    profilePicture: faker.image.avatar(),
  },
  {
    id: 4,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: faker.name.jobTitle(),
    email: faker.internet.email(),
    profilePicture: faker.image.avatar(),
  },
  {
    id: 5,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: faker.name.jobTitle(),
    email: faker.internet.email(),
    profilePicture: faker.image.avatar(),
  },
  {
    id: 6,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: faker.name.jobTitle(),
    email: faker.internet.email(),
    profilePicture: faker.image.avatar(),
  },
  {
    id: 7,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: faker.name.jobTitle(),
    email: faker.internet.email(),
    profilePicture: faker.image.avatar(),
  },
  {
    id: 8,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: faker.name.jobTitle(),
    email: faker.internet.email(),
    profilePicture: faker.image.avatar(),
  },
];

const totalCards = 245;
const totalCollections = 24;

const Profile = () => {
  const { id } = useParams();

  let isCurrentUser = false;
  if (typeof id === 'undefined') {
    isCurrentUser = true;
  }

  let user = data[0];
  if (!isCurrentUser) {
    [user] = data.filter(person => person.id === parseInt(id, 10));
  }

  const tabs = [{ text: 'Cards' }, { text: 'Collections' }];
  if (isCurrentUser) {
    tabs.push({ text: 'Settings ' });
  }

  const tabPanels = [<Cards />, <div>Collections</div>];
  if (isCurrentUser) {
    tabPanels.push(<Heading1>YOU FOUND IT CHANGE YOUR PASSWORD NOW</Heading1>);
  }

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
              image={user.profilePicture}
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
          tabs={tabs}
          tabPanels={tabPanels}
        />
      </div>
    </>
  );
};

export default Profile;
