import React, { useState } from 'react';
import Content from './Content';
import CardView from './CardView';
import Filters from './Filters';

const Cards = props => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
        startDate={startDate}
        endDate={endDate}
      />
      <Filters
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    </Content>
  );
};

export default Cards;
