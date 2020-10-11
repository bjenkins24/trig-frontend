import React, { useState } from 'react';
import {
  Heading1,
  Body1,
  Button,
  ListItemContent,
  Avatar,
  ListItem,
  List,
  StringFieldWithButton,
} from '@trig-app/core-components';
import { useHistory } from 'react-router-dom';
import faker from 'faker';
import Head from '../components/Head';
import Hero from '../components/Hero';
import { heroContentMaxWidth } from '../utils/constants';
import Content from '../components/Content';
import Filters from '../components/Filters';

const data = [
  {
    id: 1,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: faker.name.jobTitle(),
    profilePicture: faker.image.avatar(),
  },
  {
    id: 2,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: faker.name.jobTitle(),
    profilePicture: faker.image.avatar(),
  },
  {
    id: 3,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: faker.name.jobTitle(),
    profilePicture: faker.image.avatar(),
  },
  {
    id: 4,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: faker.name.jobTitle(),
    profilePicture: faker.image.avatar(),
  },
  {
    id: 5,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: faker.name.jobTitle(),
    profilePicture: faker.image.avatar(),
  },
  {
    id: 6,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: faker.name.jobTitle(),
    profilePicture: faker.image.avatar(),
  },
  {
    id: 7,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: faker.name.jobTitle(),
    profilePicture: faker.image.avatar(),
  },
  {
    id: 8,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: faker.name.jobTitle(),
    profilePicture: faker.image.avatar(),
  },
];

const People = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <Head title="People" />
      <Hero
        css={`
          margin-bottom: ${({ theme }) => theme.space[5]}px;
        `}
      >
        <div
          css={`
            max-width: ${heroContentMaxWidth}px;
            margin: 0 auto;
            display: flex;
          `}
        >
          <div>
            <Heading1 color="pc">People</Heading1>
            <Body1 color="pc">
              Find experts in your organization and view their cards and
              collections.
            </Body1>
          </div>
          <div
            css={`
              margin-left: auto;
              align-self: center;
            `}
          >
            <Button>Invite People</Button>
          </div>
        </div>
      </Hero>
      <Content>
        <div
          css={`
            width: 982px;
            margin-right: ${({ theme }) => theme.space[5]}px;
          `}
        >
          <>
            <div
              css={`
                margin-bottom: ${({ theme }) => theme.space[4]}px;
              `}
            >
              <StringFieldWithButton
                width={34.5}
                value={searchValue}
                onChange={event => {
                  setSearchValue(event.target.value);
                }}
                onSubmit={() => console.log('search')}
                buttonContent="Search"
                placeholder="Find a person..."
              />
            </div>
            <List>
              {data.map(person => {
                return (
                  <ListItem
                    key={person.id}
                    onClick={() => history.push(`/people/${person.id}`)}
                    href={`/people/${person.id}`}
                    renderItem={() => (
                      <Avatar
                        firstName={person.firstName}
                        lastName={person.lastName}
                        image={person.profilePicture}
                        size={4}
                        imageHeight={40}
                        imageWidth={40}
                      />
                    )}
                    renderContent={() => (
                      <ListItemContent
                        primary={`${person.firstName} ${person.lastName}`}
                        secondary={person.position}
                      />
                    )}
                  />
                );
              })}
            </List>
          </>
        </div>
        <Filters />
      </Content>
    </>
  );
};

export default People;
