import React from 'react';
import PropTypes from 'prop-types';
import {
  Heading2,
  Body1,
  Checkbox,
  DateRangeField,
  SelectField,
} from '@trig-app/core-components';

const filterCategoryProps = {
  categoryName: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedItems: PropTypes.func.isRequired,
};

const makeLabel = ({ name, count }) => {
  return `${name} (${count})`;
};

export const maxDefaultFilters = 5;
export const maxWithoutSearchFilters = 9;

export const FilterCategory = ({
  categoryName,
  items,
  selectedItems,
  setSelectedItems,
}) => {
  const totalItems = items.length;
  if (
    (totalItems < 1 || (totalItems <= 1 && categoryName === 'Card Types')) &&
    selectedItems.length === 0
  ) {
    return null;
  }

  let slicedItems = items;
  let searchItems = [];

  if (totalItems > maxWithoutSearchFilters) {
    slicedItems = items.slice(0, maxDefaultFilters);
    searchItems = items.slice(maxDefaultFilters);
  }

  searchItems = searchItems.map(item => {
    return { value: item.name, label: makeLabel(item) };
  });

  return (
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
        {categoryName}
      </Body1>
      {slicedItems.map(item => (
        <Checkbox
          key={makeLabel(item)}
          width="100%"
          labelProps={{
            color: 'p',
            style: { fontSize: '14px', marginTop: '2px' },
          }}
          label={makeLabel(item)}
          onChange={() => {
            if (selectedItems.includes(item.name)) {
              setSelectedItems(selectedItems.filter(i => i !== item.name));
            } else {
              setSelectedItems([...selectedItems, item.name]);
            }
          }}
          checked={selectedItems.includes(item.name)}
          css={`
            margin-bottom: ${({ theme }) => theme.space[2]}px;
          `}
        />
      ))}
      {searchItems.length > 0 && (
        <SelectField
          placeholder="Search..."
          width="100%"
          value={1}
          size="sm"
          css={`
            margin-top: ${({ theme }) => theme.space[3]}px;
            margin-bottom: ${({ theme }) => theme.space[3]}px;
          `}
          onChange={value => {
            setSelectedItems([...selectedItems, value.value]);
          }}
          options={searchItems}
          noOptionsMessage={() => `No ${categoryName.toLowerCase()} found`}
        />
      )}
    </div>
  );
};

FilterCategory.propTypes = filterCategoryProps;

const FiltersProps = {
  startDate: PropTypes.instanceOf(Date),
  setStartDate: PropTypes.func.isRequired,
  endDate: PropTypes.instanceOf(Date),
  setEndDate: PropTypes.func.isRequired,
  selectedTags: PropTypes.array.isRequired,
  setSelectedTags: PropTypes.func.isRequired,
  selectedTypes: PropTypes.array.isRequired,
  setSelectedTypes: PropTypes.func.isRequired,
  tags: PropTypes.array,
  types: PropTypes.array,
};

const defaultProps = {
  startDate: null,
  endDate: null,
  tags: [],
  types: [],
};

const Filters = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedTags,
  setSelectedTags,
  selectedTypes,
  setSelectedTypes,
  tags,
  types,
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
        <FilterCategory
          categoryName="Topics"
          items={tags}
          setSelectedItems={setSelectedTags}
          selectedItems={selectedTags}
        />
        <FilterCategory
          categoryName="Card Types"
          items={types}
          setSelectedItems={setSelectedTypes}
          selectedItems={selectedTypes}
        />
      </div>
    </div>
  );
};

Filters.propTypes = FiltersProps;
Filters.defaultProps = defaultProps;

export default Filters;
