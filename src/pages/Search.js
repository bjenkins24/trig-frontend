import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import {
  Icon,
  HugeStyles,
  Body2Styles,
  Body2,
  Heading2,
} from '@trig-app/core-components';
import {
  TabsNavigation,
  CardItem,
} from '@trig-app/core-components/dist/compositions';
import Filters from '../components/Filters';

const MockRecentSelections = [
  'How to memorize music 5 times faster',
  'Onboarding Support',
  'Brian Jenkins',
  'Mary Jenkins',
  'RFC Enterprise',
];

const MockResults = [
  {
    id: '1',
    title: 'My first result title',
    dateTime: 'Oct 27, 2018 at 5:40pm',
    user: {
      firstName: 'Brian',
      lastName: 'Jenkins',
    },
    cardType: 'doc',
    context: 'This is my cool description',
    link: 'https://google.com',
  },
  {
    id: '2',
    title: 'My first result title',
    dateTime: 'Oct 27, 2018 at 5:40pm',
    user: {
      firstName: 'Brian',
      lastName: 'Jenkins',
    },
    cardType: 'doc',
    context: 'This is my cool description',
    link: 'https://google.com',
  },
  {
    id: '3',
    title: 'My first result title',
    dateTime: 'Oct 27, 2018 at 5:40pm',
    user: {
      firstName: 'Brian',
      lastName: 'Jenkins',
    },
    cardType: 'doc',
    context: 'This is my cool description',
    link: 'https://google.com',
  },
  {
    id: '4',
    title: 'My first result title',
    dateTime: 'Oct 27, 2018 at 5:40pm',
    user: {
      firstName: 'Brian',
      lastName: 'Jenkins',
    },
    cardType: 'doc',
    context: 'This is my cool description',
    link: 'https://google.com',
  },
];

const RecentSelection = styled.button`
  ${Body2Styles}
  color: ${({ theme }) => theme.colors.s};
  border: 0;
  background: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  &:hover, &:focus {
    text-decoration: underline;
  }
`;

const Separator = styled.div`
  height: 3px;
  background: ${({ theme }) => theme.colors.ps[50]};
  width: 108.8%;
  margin-left: -4.4%;
`;

const GlobalStyle = createGlobalStyle`
    body {
        overflow: hidden;
    }
`;

const VIEWS = {
  CARDS: 'cards',
  DECKS: 'decks',
  PEOPLE: 'people',
};

const SearchProps = {
  onRequestClose: PropTypes.func.isRequired,
  defaultInput: PropTypes.string,
};

const defaultProps = {
  defaultInput: '',
};

const Search = ({ onRequestClose, defaultInput }) => {
  const [searchInput, setSearchInput] = useState(defaultInput);
  const [currentView, setCurrentView] = useState(VIEWS.CARDS);
  const inputRef = useRef(null);

  useEffect(() => {
    const closeSearch = event => {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    };
    window.addEventListener('keyup', closeSearch);
    return () => {
      window.removeEventListener('keyup', closeSearch);
    };
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <GlobalStyle />
      <div
        css={`
          width: calc(100% - 8%);
          height: 100%;
          background: ${({ theme }) => theme.b};
          opacity: 0.98;
          position: fixed;
          z-index: 1000;
          padding: ${({ theme }) => theme.space[5]}px 4%;
        `}
      >
        <Icon
          type="close"
          onClick={onRequestClose}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              onRequestClose();
            }
          }}
          tabIndex={0}
          role="button"
          color="ps.200"
          css={`
            cursor: pointer;
            position: absolute;
            outline: 0;
            top: ${({ theme }) => theme.space[4]}px;
            right: ${({ theme }) => theme.space[4]}px;
            transition: all 0.15s;
            &:hover svg,
            &:focus svg {
              color: ${({ theme }) => theme.colors.p};
            }
          `}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          onChange={e => {
            setSearchInput(e.target.value);
          }}
          value={searchInput}
          css={`
            ${HugeStyles}
            position: relative;
            left: -5px;
            width: 100%;
            background: none;
            border: 0;
            margin-top: ${({ theme }) => theme.space[4]}px;
            outline: none;
            &::placeholder {
              color: ${({ theme }) => theme.ps[100]};
            }
          `}
        />
        <div
          css={`
            margin-bottom: ${({ theme }) => theme.space[5]}px;
          `}
        >
          <Body2>Recent searches: </Body2>
          {MockRecentSelections.map((selection, index) => {
            return (
              <>
                <RecentSelection
                  onClick={() => {
                    setSearchInput(selection);
                  }}
                >
                  {selection.length > 25
                    ? `${selection.substring(0, 22).trim()}...`
                    : selection}
                </RecentSelection>
                {index !== MockRecentSelections.length - 1 && ', '}
              </>
            );
          })}
        </div>
        <div
          css={`
            position: relative;
          `}
        >
          <Separator
            css={`
              margin-bottom: ${({ theme }) =>
                theme.space[3] + theme.space[1]}px;
            `}
          />
          <TabsNavigation
            variant="light"
            tabs={[
              { text: 'Cards', onClick: () => setCurrentView(VIEWS.CARDS) },
              { text: 'Decks', onClick: () => setCurrentView(VIEWS.DECKS) },
              { text: 'People', onClick: () => setCurrentView(VIEWS.PEOPLE) },
            ]}
          />
          <Separator
            css={`
              margin-top: ${({ theme }) => theme.space[3]}px;
              margin-bottom: ${({ theme }) => theme.space[5]}px;
            `}
          />
        </div>
        <div
          css={`
            display: flex;
            height: 40%;
            overflow-y: scroll;
          `}
        >
          {currentView === VIEWS.CARDS && (
            <>
              <div
                css={`
                  width: 80%;
                  margin-right: ${({ theme }) => theme.space[5]}px;
                `}
              >
                <Heading2
                  css={`
                    margin-bottom: ${({ theme }) => theme.space[4]};
                  `}
                >
                  Results
                </Heading2>

                <ul
                  css={`
                    padding: 0;
                  `}
                >
                  {MockResults.map(result => {
                    return (
                      <div
                        css={`
                          margin-bottom: ${({ theme }) => theme.space[2]};
                        `}
                      >
                        <CardItem
                          href={result.link}
                          key={result.id}
                          moreProps={{ onClick: () => null }}
                          avatarProps={{
                            firstName: result.user.firstName,
                            lastName: result.user.lastName,
                          }}
                          cardType={result.cardType}
                          title={result.title}
                          dateTimeCreated={result.dateTime}
                          favoriteProps={{ onClick: () => null }}
                          content={result.context}
                        />
                      </div>
                    );
                  })}
                </ul>
              </div>
              <Filters />
            </>
          )}
          {currentView === VIEWS.DECKS && <div>Decks</div>}
          {currentView === VIEWS.PEOPLE && <div>People</div>}
        </div>
      </div>
    </>
  );
};

Search.propTypes = SearchProps;
Search.defaultProps = defaultProps;

export default Search;
