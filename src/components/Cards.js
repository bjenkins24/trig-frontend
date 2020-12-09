import React from 'react';
import Content from './Content';
import CardView from './CardView';
import Filters from './Filters';
import useFilters from '../utils/useFilters';

const Cards = props => {
  const { queryString, filterProps } = useFilters();

  return (
    <Content
      css={`
        margin-top: ${({ theme }) => theme.space[5]}px;
      `}
      {...props}
    >
      <CardView
        css={`
          margin-right: ${({ theme }) => theme.space[5]}px;
        `}
        queryString={queryString}
      />
      <Filters {...filterProps} />
    </Content>
  );
};

export default Cards;
