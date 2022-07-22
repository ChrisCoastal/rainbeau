import type { FC } from 'react';
import React, { useRef, useEffect } from 'react';

// images
import redImage from '../../images/brennan-ehrhardt-HALe2SmkWAI-unsplash.jpg';
import purpleImage from '../../images/martin-brechtl-zs3HRrWW66A-unsplash.jpg';

// components
import CanvasMarkers from '../CanvasMarker/CanvasMarkers';

// config
import {
  CANVAS_RESOLUTION,
  MEASUREMENT_PRECISION,
  RGBA_GROUP,
} from '../../utils/config';

// helpers
import { getPxGroupXY } from '../../utils/helpers';

// styles
import { Wrapper, Canvas, ImageFallback } from './CanvasImage.styles';

interface CanvasImageProps {
  palette: xyRgbType[];
  currentImageData: indexRgbType[];
  dispatch: React.Dispatch<ReducerActions>;
}

const CanvasImage: FC<CanvasImageProps> = ({
  palette,
  currentImageData,
  dispatch,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const canvasXY = [
    canvasCtxRef.current?.canvas.width,
    canvasCtxRef.current?.canvas.height,
  ];
  console.log(palette);

  const imagePxGroups = useRef<indexRgbType[]>([]);
  // const imagePxGroups = useRef<indexRgbType[]>([]);
  const channelTotal = useRef<rgbType>({ r: 0, g: 0, b: 0 });

  // create initial markers
  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      const ctx = canvasCtxRef.current;

      // define canvas resolution
      ctx!.canvas.width = CANVAS_RESOLUTION.high;
      ctx!.canvas.height = CANVAS_RESOLUTION.high;

      const base_image = new Image();
      base_image.setAttribute('crossOrigin', 'anonymous');
      base_image.onload = () => {
        // drawImage(image, startx, starty, widthx, widthy)
        ctx?.drawImage(base_image, 0, 0, ctx.canvas.width, ctx.canvas.height);
        const imageData = ctx!.getImageData(
          0,
          0,
          ctx!.canvas.width,
          ctx!.canvas.height
        ).data;

        imagePxGroups.current = []; // reset from previous image
        channelTotal.current = { r: 0, g: 0, b: 0 }; // reset from previous image

        // get rgba data for selected image area
        const dataPoints = imageData.length;
        const sampleRate = RGBA_GROUP * MEASUREMENT_PRECISION;

        // const pxMeasuredPerChannel = dataPoints / sampleRate;

        for (let i = 0; i < dataPoints; i += sampleRate) {
          const rPx = imageData[i];
          const gPx = imageData[i + 1];
          const bPx = imageData[i + 2];
          // const a = imageData[i + 3]; // this is the alpha channel; can be accounted for when transparency

          imagePxGroups.current.push({
            r: rPx,
            g: gPx,
            b: bPx,
            i: i,
            // xy: getXY(i),
          });
          channelTotal.current.r += rPx;
          channelTotal.current.g += gPx;
          channelTotal.current.b += bPx;
        }
        dispatch({
          type: 'setCurrentImageData',
          payload: imagePxGroups.current,
        });
        // console.log(dataPoints, imagePxGroups.current);

        const getDominantChannel = () => {
          const { r, g, b } = channelTotal.current;
          if (r >= g && r >= b) return 'r';
          if (g >= r && g >= b) return 'g';
          if (b >= g && b >= r) return 'b';
          return 'r';
        };

        const dominantChannel = getDominantChannel();
        // const chanMax = Math.max(
        //   channelTotal.current.r,
        //   channelTotal.current.g,
        //   channelTotal.current.b
        // );
        // const chanMin = Math.min(
        //   channelTotal.current.r,
        //   channelTotal.current.g,
        //   channelTotal.current.b
        // );
        console.log(imagePxGroups.current);

        imagePxGroups.current.sort(colorSort);

        // comparator
        function colorSort(a: rgbType, b: rgbType) {
          if (a[dominantChannel] < b[dominantChannel]) {
            return -1;
          }
          if (a[dominantChannel] > b[dominantChannel]) {
            return 1;
          }

          return 0;
        }
        console.log('sampled', imagePxGroups.current.length);

        // const middle = allPxColor.current.r.length / 2;
        // const MEDIAN = { lower: 1 / 2, upper: 1 / 2 + 1 };
        // const MID_AVG = { lower: 1 / 3, upper: 2 / 3 };
        const sampleSize = {
          lowerLimit: Math.floor(imagePxGroups.current.length * 0.5),
          upperLimit: Math.floor(imagePxGroups.current.length * 0.5) + 1,
        };
        // markers.push(imagePxGroups.current[0]); //FIXME:

        const rgbValue: xyRgbType = imagePxGroups.current
          .slice(sampleSize.lowerLimit, sampleSize.upperLimit)
          .reduce(
            (acc, rgb, _, { length }) => ({
              r: acc.r + rgb.r / length,
              g: acc.g + rgb.g / length,
              b: acc.b + rgb.b / length,
              xy: getPxGroupXY(rgb.i),
            }),
            { r: 0, g: 0, b: 0, xy: { xPos: 0, yPos: 0 } }
          );

        console.log(rgbValue);
        console.log(canvasRef.current?.getBoundingClientRect());

        dispatch({ type: 'addPalette', payload: rgbValue });
      };

      // asign image src to canvas context
      // base_image.src = redImage;
      base_image.src = purpleImage;
    }
    // update when image is URL is passed from props
  }, []);

  useEffect(() => {
    console.log('PALETTE CHANGE', palette);
  }, [palette]);

  return (
    <>
      <Wrapper>
        <CanvasMarkers
          palette={palette}
          currentImageData={currentImageData}
          canvasXY={canvasXY}
          canvasBound={canvasRef.current?.getBoundingClientRect()}
          dispatch={dispatch}
        />
        <Canvas ref={canvasRef}>
          <ImageFallback src={redImage} alt="Fallback image" />
        </Canvas>
      </Wrapper>
    </>
  );
};

export default CanvasImage;
