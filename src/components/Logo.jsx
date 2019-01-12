import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Icon } from 'assets/media/brand/icon.svg';

export const Logo = styled.div`
  align-items: flex-start;
  display: inline-flex;
  font-size: 0;

  svg {
    height: auto;
    max-height: 100%;
    width: 4.8rem;
    -webkit-animation: rotation 5s infinite; /* Safari 4.0 - 8.0 */
    animation: rotation 5s infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotateY(10deg);
    }
    25% {
      transform: rotateY(70deg);
    }
    50% {
      transform: rotateY(180deg);
    }
    75% {
      transform: rotateY(70deg);
    }
    100% {
      transform: rotateY(10deg);
    }
  }
`;

export default () => (
  <Logo>
    <Icon />
  </Logo>
);
