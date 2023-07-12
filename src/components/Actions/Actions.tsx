import type { FC } from 'react';
import { useState } from 'react';

// hooks
import useAppContext from '../../hooks/useAppContext';
import useCanvasImage from '../../hooks/useCanvasImage';

// components
import Modal from '../../UI/Modal/Modal';

// mui
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';

// styles
import { Wrapper, DropArea } from './Actions.styles';

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
  const { state } = useAppContext();
  const { changeImage } = useCanvasImage();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const modalHandler = (isVisible: boolean) => {
    setModalOpen(isVisible);
  };

  const uploadModal = {
    openState: modalOpen,
    content: (
      <DropArea>
        <UploadIcon />
        <p>drag and drop an image here to upload</p>
      </DropArea>
    ),
    buttons: [{ text: 'Image From File' }, { text: 'Upload' }],
    handler: modalHandler,
    openModalButton: (
      <Tooltip title="upload image">
        <span>
          <IconButton
            onClick={() => modalHandler(true)}
            sx={{ transform: 'rotate: 180deg;' }}
          >
            <UploadIcon />
          </IconButton>
        </span>
      </Tooltip>
    ),
  };

  return (
    <Wrapper>
      <div>
        <Tooltip title="new image">
          <IconButton onClick={changeImageHandler}>
            <AddPhotoAlternateIcon />
          </IconButton>
        </Tooltip>
        {/* <Modal
          openState={uploadModal.openState}
          openModalButton={uploadModal.openModalButton}
          content={uploadModal.content}
          buttons={uploadModal.buttons}
          modalHandler={uploadModal.handler}
        /> */}
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
