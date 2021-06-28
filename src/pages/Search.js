import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { Icon, HugeStyles, Heading2 } from '@trig-app/core-components';
import {
  TabsNavigation,
  CardItem,
} from '@trig-app/core-components/dist/compositions';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Filters from '../components/Filters';
import {
  makeMoreList,
  saveView,
  useDelete,
  useFavorite,
} from '../components/CardView';
import useFilters from '../utils/useFilters';
import useCards from '../utils/useCards';
import EmptyState from '../components/EmptyState';
import { track } from '../utils/track';

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
  COLLECTIONS: 'collections',
  PEOPLE: 'people',
};

/* eslint-disable react/prop-types */
const CardResult = React.memo(({ card, cardQueryKey, isPublic }) => {
  const mutateFavorite = useFavorite(cardQueryKey);
  const mutateDelete = useDelete(cardQueryKey);

  return (
    <div
      css={`
        margin-bottom: ${({ theme }) => theme.space[2]};
      `}
      key={card.id}
    >
      <CardItem
        onClick={async () => {
          await saveView({ token: card.token, isPublic });
        }}
        href={card.url}
        openInNewTab
        moreProps={{ onClick: () => null }}
        avatarProps={{
          size: 0,
          style: { marginRight: 0 },
          email: card.user.email,
          firstName: card.user.first_name,
          lastName: card.user.last_name,
        }}
        favoriteProps={{
          onClick: async () => {
            await mutateFavorite({
              is_favorited: !card.is_favorited,
              id: card.id,
            });
          },
          type: card.is_favorited ? 'heart-filled' : 'heart',
        }}
        title={get(card, 'highlights.title', card.title)}
        dateTime={new Date(card.created_at)}
        content={get(card, 'highlights.content', '')}
        navigationList={makeMoreList({
          mutate: mutateDelete,
          id: card.id,
          title: card.title,
        })}
      />
    </div>
  );
});
/* esline-enable react/prop-types */

const SearchProps = {
  onRequestClose: PropTypes.func.isRequired,
  defaultInput: PropTypes.string,
  collectionId: PropTypes.number,
  isPublic: PropTypes.bool.isRequired,
};

const defaultProps = {
  defaultInput: '',
  collectionId: null,
};

const Search = ({ onRequestClose, defaultInput, collectionId, isPublic }) => {
  const [searchInput, setSearchInput] = useState(defaultInput);
  const [currentView, setCurrentView] = useState(VIEWS.CARDS);
  const inputRef = useRef(null);
  const { filterProps, queryString } = useFilters();
  let collectionQuery = '';
  if (collectionId) {
    collectionQuery = `&col=${collectionId}`;
  }
  const cardQueryKey = `h=1&q=${searchInput}&${queryString}${collectionQuery}`;
  const { cards, totalResults, fetchCards, isLoading, filters } = useCards({
    queryString: cardQueryKey,
    queryConfig: { enabled: false },
  });

  const debouncedFetch = useCallback(debounce(fetchCards, 150), []);

  useEffect(() => {
    track('User Opened Search', {
      isAuthenticated: !isPublic,
    });
  }, []);

  useEffect(() => {
    if (!searchInput) return;
    debouncedFetch();
  }, [searchInput, cardQueryKey]);

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
          height: calc(100% - ${({ theme }) => theme.space[5]}px);
          position: fixed;
          background: ${({ theme }) => theme.b};
          opacity: 0.98;
          z-index: 2000;
          padding: ${({ theme }) => theme.space[5]}px 4% 0;
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
        <div
          css={`
            width: 100%;
            background: ${({ theme }) => theme.b};
            margin: -64px 0 0 -4%;
            padding: 64px 0 0 4%;
            z-index: 1;
          `}
        >
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
              background: ${({ theme }) => theme.b};
              border: 0;
              margin-bottom: ${({ theme }) =>
                theme.space[5] - theme.space[2]}px;
              outline: none;
              &::placeholder {
                color: ${({ theme }) => theme.ps[100]};
              }
            `}
          />
          <div
            css={`
              position: relative;
            `}
          >
            <Separator />
            <TabsNavigation
              variant="light"
              tabs={[
                {
                  text:
                    totalResults !== 0 ? `Cards (${totalResults})` : 'Cards',
                  onClick: () => setCurrentView(VIEWS.CARDS),
                },
              ]}
            />
            <Separator
              css={`
                margin-top: -2px;
                margin-bottom: ${({ theme }) =>
                  theme.space[5] - theme.space[2]}px;
              `}
            />
          </div>
        </div>
        <div
          css={`
            position: relative;
            height: calc(100% - 266px);
            width: calc(100% + ${({ theme }) => theme.space[5]}px);
            margin-left: -${({ theme }) => theme.space[4]}px;
            margin-top: -${({ theme }) => theme.space[3]}px;
            &:after {
              content: '';
              position: absolute;
              z-index: 1;
              bottom: 0;
              left: 0;
              pointer-events: none;
              background-image: linear-gradient(
                to bottom,
                rgba(245, 245, 245, 0),
                rgba(245, 245, 245, 1) 90%
              );
              width: 100%;
              height: ${({ theme }) => theme.space[3]}px;
            }
            &:before {
              content: '';
              position: absolute;
              z-index: 1;
              top: 0;
              left: 0;
              pointer-events: none;
              background-image: linear-gradient(
                to top,
                rgba(245, 245, 245, 0),
                rgba(245, 245, 245, 1) 90%
              );
              width: 100%;
              height: ${({ theme }) => theme.space[3]}px;
            }
          `}
        >
          <PerfectScrollbar
            css={`
              .ps__rail-y {
                z-index: 2;
              }
            `}
          >
            <div
              css={`
                max-width: 1200px;
                display: flex;
                margin: 0 auto ${({ theme }) => theme.space[3]}px;
              `}
            >
              {currentView === VIEWS.CARDS && (
                <>
                  <div
                    css={`
                      width: 100%;
                      margin-right: ${({ theme }) => theme.space[5]}px;
                    `}
                  >
                    <Heading2
                      css={`
                        margin-top: ${({ theme }) => theme.space[3]}px;
                        margin-bottom: ${({ theme }) => theme.space[4]};
                      `}
                    >
                      Results
                    </Heading2>
                    {!isLoading && cards.length === 0 && (
                      <EmptyState
                        css={`
                          margin-top: -${({ theme }) => theme.space[2]}px;
                        `}
                        hasImage={false}
                        heading="No Results"
                        content="Your search found no cards."
                      />
                    )}
                    <ul
                      css={`
                        padding: 0;
                        list-style-type: none;
                      `}
                    >
                      {cards.length > 0 &&
                        cards.map(card => {
                          return (
                            <CardResult
                              isPublic={isPublic}
                              key={card.id}
                              card={card}
                              cardQueryKey={`cards?${cardQueryKey}`}
                            />
                          );
                        })}
                    </ul>
                  </div>
                  <Filters
                    isPublic={isPublic}
                    tags={filters.tags}
                    types={filters.types}
                    {...filterProps}
                    css={`
                      margin-top: ${({ theme }) => theme.space[3]}px;
                    `}
                  />
                </>
              )}
              {currentView === VIEWS.COLLECTIONS && <div>Collections</div>}
              {currentView === VIEWS.PEOPLE && <div>People</div>}
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </>
  );
};

Search.propTypes = SearchProps;
Search.defaultProps = defaultProps;

export default Search;
