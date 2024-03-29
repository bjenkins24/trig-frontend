import { createGlobalStyle } from 'styled-components';
import {
  HeroNew,
  HeroNewItalic,
  HeroNewSemiBold,
  HeroNewSemiBoldItalic,
  HeroNewBold,
  HeroNewBoldItalic,
} from './src/fonts';
import 'normalize.css';

export default createGlobalStyle`
    @font-face {
        font-family: 'hero new';
        font-style: normal;
        font-weight: 400;
        src: local('Hero New Regular'), url(${HeroNew}) format('woff');
    }

    @font-face {
        font-family: 'hero new';
        font-style: italic;
        font-weight: 400;
        src: local('Hero New Regular Italic'), url(${HeroNewItalic}) format('woff');
    }

    @font-face {
        font-family: 'hero new';
        font-style: normal;
        font-weight: 500;
        src: local('Hero New SemiBold'), url(${HeroNewSemiBold}) format('woff');
    }

    @font-face {
        font-family: 'hero new';
        font-style: italic;
        font-weight: 500;
        src: local('Hero New SemiBold Italic'), url(${HeroNewSemiBoldItalic}) format('woff');
    }

    @font-face {
        font-family: 'hero new';
        font-style: normal;
        font-weight: 600;
        src: local('Hero New Bold'), url(${HeroNewBold}) format('woff');
    }

    @font-face {
        font-family: 'hero new';
        font-style: italic;
        font-weight: 600;
        src: local('Hero New Bold Italic'), url(${HeroNewBoldItalic}) format('woff');
    }

    html {
        font-family: hero new, sans-serif;
        font-size: 62.5%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: ${({ theme }) => theme.colors.b};
    }  

    form {
        margin-block-end: 0;
    }

    a {
        text-decoration: none;
        transition: all 0.2s;
        color: ${({ theme }) => theme.s} !important;
        &:hover {
           color: ${({ theme }) => theme.ss[200]} !important;
        }
    }
    
    .ReactQueryDevTools div, .ReactQueryDevTools span, .ReactQueryDevTools code, .ReactQueryDevTools button {
      font-size: 1.2rem !important;
    }
`;
