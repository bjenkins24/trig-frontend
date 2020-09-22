import React, { useState } from 'react';
import {
  Heading2,
  Body1,
  Checkbox,
  Body3,
  DateRangeField,
} from '@trig-app/core-components';

// eslint-disable-next-line
const MockCheckbox = ({ label }) => {
  return (
    <Checkbox
      width="100%"
      labelProps={{
        color: 'p',
        style: { fontSize: '14px', marginTop: '2px' },
      }}
      label={label}
      css={`
        margin-bottom: ${({ theme }) => theme.space[2]}px;
      `}
    />
  );
};

// eslint-disable-next-line
const MockFilters = ({ category }) => {
  return (
    <div>
      <Body1
        separator
        color="ps.200"
        css={`
          margin-bottom: ${({ theme }) => theme.space[3]}px;
        `}
      >
        {category}
      </Body1>
      <MockCheckbox label="Document" />
      <MockCheckbox label="File" />
      <MockCheckbox label="Link" />
      <Body3
        color="ps.200"
        css={`
          display: block;
          margin-bottom: ${({ theme }) => theme.space[4]}px;
        `}
      >
        More...
      </Body3>
    </div>
  );
};

const Filters = ({ ...restProps }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div
      css={`
        width: 366px;
      `}
      {...restProps}
    >
      <Heading2
        css={`
          margin-bottom: ${({ theme }) => theme.space[4]};
        `}
      >
        Filter By
      </Heading2>
      <div
        css={`
          margin-bottom: ${({ theme }) => theme.space[4]}px;
        `}
      >
        <Body1
          separator
          color="ps.200"
          css={`
            margin-bottom: ${({ theme }) => theme.space[3]}px;
          `}
        >
          Date
        </Body1>
        <DateRangeField
          startDate={startDate}
          endDate={endDate}
          onSelectStart={date => setStartDate(date)}
          onSelectEnd={date => setEndDate(date)}
          clearStart={() => setStartDate(null)}
          clearEnd={() => setEndDate(null)}
        />
      </div>
      <div>
        <MockFilters category="Card Types" />
        <MockFilters category="People" />
        <MockFilters category="Tags" />
      </div>
    </div>
  );
};

export default Filters;
