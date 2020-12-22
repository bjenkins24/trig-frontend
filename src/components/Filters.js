import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Heading2,
  Body1,
  Checkbox,
  Body3,
  DateRangeField,
} from '@trig-app/core-components';

// eslint-disable-next-line
const Item = ({ label, ...restProps }) => {
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
      {...restProps}
    />
  );
};

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

const maxTypes = 5;
const maxTags = 5;

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
  const [moreTags, setMoreTags] = useState(false);
  const [moreTypes, setMoreTypes] = useState(false);
  let totalTags = 0;
  let totalTypes = 0;
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
        {(tags.length > 0 || selectedTags.length > 0) && (
          <div>
            <Body1
              separator
              color="ps.200"
              css={`
                margin-bottom: ${({ theme }) => theme.space[3]}px;
              `}
            >
              Topics
            </Body1>
            <>
              {tags.map(tag => {
                totalTags += 1;
                if (totalTags > maxTags && !moreTags) return null;
                return (
                  <Item
                    key={tag.tag}
                    label={`${tag.tag} (${tag.count})`}
                    onChange={() => {
                      if (selectedTags.includes(tag.tag)) {
                        setSelectedTags(
                          selectedTags.filter(item => item !== tag.tag)
                        );
                      } else {
                        setSelectedTags([...selectedTags, tag.tag]);
                      }
                    }}
                    checked={selectedTags.includes(tag.tag)}
                  />
                );
              })}
            </>
            {tags.length > maxTags && (
              <Body3
                onClick={() => {
                  if (!moreTags) {
                    setMoreTags(true);
                  } else {
                    setMoreTags(false);
                  }
                }}
                color="ps.200"
                css={`
                  cursor: pointer;
                  display: block;
                  margin-bottom: ${({ theme }) => theme.space[4]}px;
                `}
              >
                {!moreTags ? 'More...' : 'Less...'}
              </Body3>
            )}
          </div>
        )}
        {(types.length > 1 || selectedTypes.length > 0) && (
          <div>
            <Body1
              separator
              color="ps.200"
              css={`
                margin-bottom: ${({ theme }) => theme.space[3]}px;
              `}
            >
              Card Types
            </Body1>
            <>
              {types.map(type => {
                totalTypes += 1;
                if (totalTypes > maxTypes && !moreTypes) return null;
                return (
                  <Item
                    key={type.type}
                    label={`${type.type} (${type.count})`}
                    onChange={() => {
                      if (selectedTypes.includes(type.type)) {
                        setSelectedTypes(
                          selectedTypes.filter(item => item !== type.type)
                        );
                      } else {
                        setSelectedTypes([...selectedTypes, type.type]);
                      }
                    }}
                    checked={selectedTypes.includes(type.type)}
                  />
                );
              })}
            </>
            {types.length > maxTypes && (
              <Body3
                color="ps.200"
                onClick={() => {
                  if (!moreTypes) {
                    setMoreTypes(true);
                  } else {
                    setMoreTypes(false);
                  }
                }}
                css={`
                  cursor: pointer;
                  display: block;
                  margin-bottom: ${({ theme }) => theme.space[4]}px;
                `}
              >
                {!moreTypes ? 'More...' : 'Less...'}
              </Body3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Filters.propTypes = FiltersProps;
Filters.defaultProps = defaultProps;

export default Filters;
