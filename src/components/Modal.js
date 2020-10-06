import React from 'react';
import { ModalComposition as CoreComponentsModal } from '@trig-app/core-components/dist/compositions';

const Modal = props => {
  return (
    <CoreComponentsModal
      appElement={document.getElementById('#app')}
      {...props}
    />
  );
};

export default Modal;
