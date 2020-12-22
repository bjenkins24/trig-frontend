import React from 'react';
import {
  Avatar,
  VerticalGroup,
  Heading1,
  Body2,
  HorizontalGroup,
} from '@trig-app/core-components';
import Hero from '../components/Hero';
import Head from '../components/Head';
import Content from '../components/Content';
import { heroContentMaxWidth } from '../utils/constants';
import { useAuth } from '../context/authContext';

const Profile = () => {
  const { user } = useAuth();

  let title = 'Profile';
  if (user.firstName || user.lastName) {
    title = `${user?.firstName} ${user?.lastName}`;
  }

  return (
    <>
      <Head title={title} />
      <Hero
        css={`
          padding-top: ${({ theme }) => theme.space[5]}px;
          padding-bottom: 0;
          margin-bottom: ${({ theme }) => theme.space[6]}px;
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
              size={15}
              css={`
                position: absolute;
                bottom: -${({ theme }) => theme.space[4]}px;
                border-radius: 50%;
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
                    {user.total_cards}
                  </Body2>
                  <Body2 color="ps.200">Cards</Body2>
                </VerticalGroup>
              </HorizontalGroup>
            </HorizontalGroup>
          </HorizontalGroup>
        </div>
      </Hero>
      <Content>
        <h1>Settings</h1>
      </Content>
    </>
  );
};

export default Profile;
