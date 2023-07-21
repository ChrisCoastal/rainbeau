import type { FC } from 'react';

// mui
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DownloadIcon from '@mui/icons-material/Download';

// styles
import { Wrapper } from './Actions.styles';

interface ActionsProps {
  changeImageHandler: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    indexStep?: number
  ) => void;
  imageDownloadURL: string | null;
}

const Actions: FC<ActionsProps> = ({
  changeImageHandler,
  imageDownloadURL,
}) => {
  return (
    <Wrapper>
      <div>
        <Tooltip title="new image">
          <IconButton onClick={changeImageHandler}>
            <AddPhotoAlternateIcon />
          </IconButton>
        </Tooltip>
        <Link href={imageDownloadURL || ''} target="_blank">
          <Tooltip
            title={
              imageDownloadURL ? 'download image' : 'download not available'
            }
          >
            <span>
              <IconButton disabled={!imageDownloadURL}>
                <DownloadIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Link>
      </div>
    </Wrapper>
  );
};

export default Actions;
