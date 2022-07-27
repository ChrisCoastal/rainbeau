import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1000px;
`;

export const Canvas = styled.canvas`
  height: 100%;
  width: 100%;
  object-fit: fit;
`;

export const ImageFallback = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

// export const ImageSource = styled.img`
//   width: 100%;
//   object-fit: cover;
// `;
