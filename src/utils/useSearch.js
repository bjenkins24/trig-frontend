import { useState, useEffect } from 'react';
import MouseTrap from 'mousetrap';

const keyMap = {
  SEARCH: [
    '<',
    '>',
    ',',
    '.',
    '/',
    '?',
    ':',
    ';',
    "'",
    '[',
    '{',
    ']',
    '}',
    '|',
    '`',
    '~',
    '\\',
    '"',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'A',
    'b',
    'B',
    'c',
    'C',
    'd',
    'D',
    'e',
    'E',
    'f',
    'F',
    'g',
    'G',
    'h',
    'H',
    'i',
    'I',
    'j',
    'J',
    'k',
    'K',
    'l',
    'L',
    'm',
    'M',
    'n',
    'N',
    'o',
    'O',
    'p',
    'P',
    'q',
    'Q',
    'r',
    'R',
    's',
    'S',
    't',
    'T',
    'u',
    'U',
    'v',
    'V',
    'w',
    'W',
    'x',
    'X',
    'y',
    'Y',
    'z',
    'Z',
  ],
};

const useSearch = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchKey, setSearchKey] = useState(null);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchKey(null);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  useEffect(() => {
    MouseTrap.bind(keyMap.SEARCH, event => {
      setIsSearchOpen(true);
      setSearchKey(event.key);
    });
  }, []);

  return {
    isSearchOpen,
    closeSearch,
    openSearch,
    searchKey,
  };
};

export default useSearch;
