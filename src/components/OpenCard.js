import React, { useEffect } from 'react';
import disableScroll from 'disable-scroll';
import { useOpenCard } from '../context/openCardContext';

const OpenCard = () => {
  const { card } = useOpenCard();

  useEffect(() => {
    disableScroll.on(document.getElementsByTagName('body')[0]);
    return () => disableScroll.off(document.getElementsByTagName('body')[0]);
  });

  return (
    <div
      css={`
        height: calc(100% - 65px);
        width: 100%;
        position: fixed;
        top: 65px;
        left: 0;
        color: white;
        z-index: 1000;
      `}
    >
      <iframe
        src="https://www.w3schools.com"
        title={card.title}
        css={`
          height: 100%;
          width: 100%;
          border: 0;
        `}
      />
    </div>
  );
};

export default OpenCard;
