// mui

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';

// styles
import { Wrapper } from './Actions.styles';
type Props = {};

const Actions = (props: Props) => {
  const flipHandler = () => {
    console.log('FLIP');
    // update context to sl
  };

  const imageUploadHandler = () => {
    return;
  };

  return (
    <Wrapper>
      Actions{' '}
      <div>
        <Tooltip title="new image">
          <IconButton onClick={() => flipHandler()}>
            <AddPhotoAlternateIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="upload image">
          <IconButton
            onClick={imageUploadHandler}
            sx={{ transform: 'rotate: 180deg;' }}
          >
            <UploadIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="download image">
          <IconButton onClick={() => console.log('DOWNLOAD')}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Wrapper>
  );
};

export default Actions;
