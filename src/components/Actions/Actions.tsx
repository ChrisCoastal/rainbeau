import type { FC } from 'react';

// hooks
import { useState } from 'react';

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
import { Wrapper } from './Actions.styles';

interface ActionsProps {
  imageDownloadURL: string | null;
  name: string | null;
  id: string | null;
}

const Actions: FC<ActionsProps> = ({ imageDownloadURL, name, id }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenUploadModal = (visible: boolean) => {
    setOpen(visible);
  };

  const flipHandler = () => {
    console.log('FLIP');
    // update context to sl
  };

  const downloadHandler = () => {
    console.log('DOWNLOAD');
  };

  const uploadModal = {
    openState: open,
    content: <div>drop here</div>,
    text: 'I am modal',
    confirmText: 'Upload',
    handler: handleOpenUploadModal,
    openModalButton: (
      <Tooltip title="upload image">
        <IconButton
          onClick={() => handleOpenUploadModal(true)}
          sx={{ transform: 'rotate: 180deg;' }}
        >
          <UploadIcon />
        </IconButton>
      </Tooltip>
    ),
  };

  return (
    <Wrapper>
      Actions
      <div>
        <Tooltip title="new image">
          <IconButton onClick={() => flipHandler()}>
            <AddPhotoAlternateIcon />
          </IconButton>
        </Tooltip>
        <Modal
          openState={uploadModal.openState}
          openModalButton={uploadModal.openModalButton}
          content={uploadModal.content}
          text={uploadModal.text}
          confirmText={uploadModal.confirmText}
          modalHandler={uploadModal.handler}
        />
        {imageDownloadURL && (
          <Link href={imageDownloadURL} target="_blank">
            <Tooltip title="download image">
              <IconButton
                onClick={downloadHandler}
                disabled={!imageDownloadURL}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </Link>
        )}
      </div>
    </Wrapper>
  );
};

export default Actions;
