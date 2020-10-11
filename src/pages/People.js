import React from 'react';
import { Heading1, Body1, Button } from '@trig-app/core-components';
import Head from '../components/Head';
import Hero from '../components/Hero';
import { heroContentMaxWidth } from '../utils/constants';
import Content from '../components/Content';
import Filters from '../components/Filters';

const People = () => {
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
          `}
        >
          People
        </div>
        <Filters />
      </Content>
    </>
  );
};

export default People;
