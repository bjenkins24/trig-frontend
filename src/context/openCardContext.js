import React, {
  useCallback,
  useContext,
  useMemo,
  useState,
  createContext,
} from 'react';

const cardDefault = {
  appUrl: '',
  url: '',
  title: '',
};

const OpenCardContext = createContext(cardDefault);
OpenCardContext.displayName = 'OpenCardContext';

const OpenCardProvider = props => {
  const [card, setCard] = useState(cardDefault);

  const setCurrentCard = useCallback(currentCard => {
    setCard(currentCard);
  }, []);

  const value = useMemo(
    () => ({
      closeCard: () => setCurrentCard({ url: '', title: '' }),
      isCardOpen: Boolean(card.url),
      card,
      setCard: setCurrentCard,
    }),
    [card, setCurrentCard]
  );

  return <OpenCardContext.Provider value={value} {...props} />;
};

function useOpenCard() {
  const context = useContext(OpenCardContext);
  if (context === undefined) {
    throw new Error(`useOpenCard must be used within a OpenCardProvider`);
  }
  return context;
}

export { OpenCardProvider, useOpenCard };
