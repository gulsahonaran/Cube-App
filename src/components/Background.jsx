import styled from 'styled-components';

const Background = styled.div`
  background: #000 linear-gradient(to bottom, #000000 0%, #000000 100%) fixed;
  color: #fff;
  min-height: 100vh;
  overflow: hidden;
  position: relative;

  &:before {
    background: linear-gradient(to bottom, #000, #fff);
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0.4;
    position: absolute;
    right: 0;
    top: 0;
    transform: rotate(-20deg) scale(1.5) translate(0, 43%);
  }
`;

export default Background;
