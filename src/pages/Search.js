import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Icon, HugeStyles } from '@trig-app/core-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        overflow: hidden;
    }
`;

const SearchProps = {
  onRequestClose: PropTypes.func.isRequired,
};

// eslint-disable-next-line
const Search = ({ onRequestClose, defaultInput }) => {
  const [searchInput, setSearchInput] = useState(defaultInput);
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
          width: calc(
            100% - ${({ theme }) => theme.space[5] + theme.space[5]}px
          );
          height: 100%;
          background: ${({ theme }) => theme.b};
          opacity: 0.98;
          position: fixed;
          z-index: 1000;
          padding: ${({ theme }) => theme.space[5]}px;
        `}
      >
        <Icon
          type="close"
          onClick={onRequestClose}
          color="ps.200"
          css={`
            cursor: pointer;
            position: absolute;
            top: ${({ theme }) => theme.space[4]}px;
            right: ${({ theme }) => theme.space[4]}px;
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
            width: 100%;
            background: none;
            border: 0;
            outline: none;
            &::placeholder {
              color: ${({ theme }) => theme.ps[100]};
            }
          `}
        />
      </div>
    </>
  );
};

Search.propTypes = SearchProps;

export default Search;
