import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  perspective: 8rem;
  pointer-events: none;
  z-index: 1000;
`;
export const Spinner = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 8px;
  backface-visibility: visible;
  animation-name: flip;
  animation-duration: 5.2s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(1, 0, 0, 1);

  @keyframes flip {
    0%,
    100% {
      transform: rotateY(0deg) rotateX(0deg);
      background-color: rgba(149, 26, 198, 0.75);
    }
    25% {
      transform: rotateY(1080deg) rotateX(0deg);
      background-color: rgba(109, 225, 239, 0.75);
    }
    50% {
      transform: rotateY(1080deg) rotateX(-1080deg);
      background-color: rgba(255, 223, 146, 0.75);
    }
    75% {
      transform: rotateY(0deg) rotateX(-1080deg);
      background-color: rgba(245, 5, 184, 0.75);
    }
  }
`;
