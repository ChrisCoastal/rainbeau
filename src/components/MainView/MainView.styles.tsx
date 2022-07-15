import styled from '@emotion/styled';

interface WrapperProps {
  bgColor: { r: number; g: number; b: number };
}

// prettier-ignore
export const Wrapper = styled.div<WrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  /* background-color: ${(props) => props.bgColor}; */
  /* background-image: ${(props) =>
    `linear-gradient(to right bottom, 
      rgb(${props.bgColor.r},${props.bgColor.g},${props.bgColor.b}),
      rgb(${props.bgColor.r - 30},${props.bgColor.g - 30},${props.bgColor.b - 30})
      )`}; */
  transition: all 0.6s ease-in;
  height: 100vh;

  /* &::after {
    position: absolute;
    display: inline-block;
    height: 100%;
    background-image: ${(props) =>
    `linear-gradient(to right bottom, 
      rgb(${props.bgColor.r},${props.bgColor.g},${props.bgColor.b}),
      rgb(${props.bgColor.r - 30},${props.bgColor.g - 30},${props.bgColor.b - 30})
      )`};
  } */
`;

export const FlipBox = styled.div`
  position: relative;
  perspective: 150rem; // perspective is not required on parent, but gives much better effect
  width: 50rem;
  height: 50rem;
`;

export const ActionsBox = styled.section`
  width: 30rem;
  height: 50rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// export const Front = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   max-width: 100%;
//   max-height: 100%;
//   // transform: translate(-50%; -50%);
//   transition: all 0.8s ease;
//   box-shadow: 0 1rem 1rem 0 #3333333e;

//   &:hover {
//     transform: rotateY(-180deg);
//   }
// `;
