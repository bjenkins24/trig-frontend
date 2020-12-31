import React, { useState } from 'react';
import faker from 'faker';
import { render, screen } from '../../test/utils';
import {
  FilterCategory,
  maxWithoutSearchFilters,
  maxDefaultFilters,
} from '../Filters';

const buildItems = count => {
  return [...Array(count).keys()].map(() => ({
    name: faker.random.word(),
    count: faker.random.number(),
  }));
};

const categoryName = 'Topics';

const FilterCategoryTest = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  return (
    <FilterCategory
      categoryName={categoryName}
      setSelectedItems={setSelectedItems}
      selectedItems={selectedItems}
      items={items}
    />
  );
};

describe('<FilterCategory />', () => {
  it("doesn't render when there is 1 or fewer items", () => {
    const items = buildItems(1);
    render(<FilterCategoryTest items={items} />);
    expect(screen.queryAllByRole('checkbox').length).toEqual(0);
  });

  it("renders it's name correctly", () => {
    const items = buildItems(2);
    render(<FilterCategoryTest items={items} />);
    expect(screen.getByText(categoryName)).toBeInTheDocument();
  });

  it(`renders all items if there are ${maxWithoutSearchFilters}`, () => {
    const items = buildItems(maxWithoutSearchFilters);
    render(<FilterCategoryTest items={items} />);
    expect(screen.getAllByRole('checkbox').length).toEqual(
      maxWithoutSearchFilters
    );
  });

  it(`renders only the first ${maxDefaultFilters} items if there are more than ${maxWithoutSearchFilters}`, () => {
    const items = buildItems(maxWithoutSearchFilters + 1);
    render(<FilterCategoryTest items={items} />);
    expect(screen.getAllByRole('checkbox').length).toEqual(maxDefaultFilters);
    expect(screen.getByText('Search...')).toBeInTheDocument();
  });
});
