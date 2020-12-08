import React from 'react';
import PropTypes from 'prop-types';
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
      {category === 'Card Types' && (
        <>
          <MockCheckbox label="Twitter" />
          <MockCheckbox label="Google Doc" />
          <MockCheckbox label="Video" />
        </>
      )}
      {category === 'People' && (
        <>
          <MockCheckbox label="Brian Jenkins" />
          <MockCheckbox label="Vikram Rajagopalan" />
          <MockCheckbox label="Scott Hanford" />
        </>
      )}
      {category === 'Tags' && (
        <>
          <MockCheckbox label="Masterminds" />
          <MockCheckbox label="Artificial Intelligence" />
          <MockCheckbox label="Introductions" />
        </>
      )}
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

const FiltersProps = {
  startDate: PropTypes.instanceOf(Date),
  setStartDate: PropTypes.func.isRequired,
  endDate: PropTypes.instanceOf(Date),
  setEndDate: PropTypes.func.isRequired,
};

const defaultProps = {
  startDate: null,
  endDate: null,
};

const Filters = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  ...restProps
}) => {
  return (
    <div
      css={`
        width: 366px;
        flex-shrink: 0;
        position: sticky;
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

Filters.propTypes = FiltersProps;
Filters.defaultProps = defaultProps;

export default Filters;
