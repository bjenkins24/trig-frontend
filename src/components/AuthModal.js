import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const AuthModalProps = {
  isRegisterOpen: PropTypes.bool.isRequired,
  setIsRegisterOpen: PropTypes.func.isRequired,
  isLoginOpen: PropTypes.bool.isRequired,
  setIsLoginOpen: PropTypes.func.isRequired,
  onRegisterSuccess: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};

const AuthModal = ({
  isRegisterOpen,
  setIsRegisterOpen,
  isLoginOpen,
  setIsLoginOpen,
  onRegisterSuccess,
  onLoginSuccess,
}) => {
  return (
    <>
      <Modal
        onRequestClose={() => {
          setIsRegisterOpen(false);
        }}
        width={35}
        isOpen={isRegisterOpen}
        header="Create an Account"
      >
        <div
          css={`
            margin: 0 auto;
            color: ${({ theme }) => theme.p} !important;
          `}
        >
          <RegisterForm
            onSuccess={onRegisterSuccess}
            signInLink={
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsRegisterOpen(false);
                    setIsLoginOpen(true);
                  }}
                  css={`
                    border: 0;
                    background: none;
                    color: ${({ theme }) => theme.s};
                    cursor: pointer;
                    padding: 0;
                    &:hover {
                      text-decoration: underline;
                    }
                  `}
                >
                  Sign in
                </button>
                .
              </>
            }
            css={`
              p,
              label {
                color: ${({ theme }) => theme.p};
                margin-top: 0;
              }
            `}
          />
        </div>
      </Modal>

      <Modal
        onRequestClose={() => {
          setIsLoginOpen(false);
        }}
        width={35}
        isOpen={isLoginOpen}
        header="Login to Trig"
      >
        <div
          css={`
            margin: 0 auto;
            color: ${({ theme }) => theme.p} !important;
          `}
        >
          <LoginForm
            onSuccess={onLoginSuccess}
            createAccountLink={
              <button
                type="button"
                onClick={() => {
                  setIsLoginOpen(false);
                  setIsRegisterOpen(true);
                }}
                css={`
                  border: 0;
                  background: none;
                  color: ${({ theme }) => theme.s};
                  cursor: pointer;
                  padding: 0;
                  &:hover {
                    text-decoration: underline;
                  }
                `}
              >
                Create an account
              </button>
            }
            css={`
              p,
              label {
                color: ${({ theme }) => theme.p};
                margin-top: 0;
              }
            `}
          />
        </div>
      </Modal>
    </>
  );
};

AuthModal.propTypes = AuthModalProps;

export default AuthModal;
