import React from 'react';

type Props = {};

const Background = (props: Props) => {
  const rgb = getAverageRGB(document.getElementById('i') as HTMLImageElement);
  document.body.style.backgroundColor =
    'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';

  function getAverageRGB(imgEl: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext && canvas.getContext('2d');

    let rgb = { r: 0, g: 0, b: 0 };

    if (!context) {
      return rgb;
    }

    let height, width, length;
    let data;
    let count = 0;
    let i = -4;
    const blockSize = 5; // only visit every 5 pixels

    height = canvas.height =
      imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width =
      imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
      data = context.getImageData(0, 0, width, height);
    } catch (e) {
      /* security error, img on diff domain */ alert('domain error');
      return rgb;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;
  }

  return <div>Background</div>;
};

export default Background;
