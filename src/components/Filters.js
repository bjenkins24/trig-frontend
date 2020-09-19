import React from 'react';

const Filters = ({ ...restProps }) => {
  return (
    <div
      css={`
        width: 366px;
      `}
      {...restProps}
    >
      Filters
    </div>
  );
};

export default Filters;
