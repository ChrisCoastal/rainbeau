import { useState } from 'react';

// types
import type { FC, ReactElement } from 'react';

// mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

// uuid
import { v4 as uuidv4 } from 'uuid';

// styles
import { Wrapper } from './Modal.styles';

interface ModalProps {
  openState: boolean;
  openModalButton: ReactElement;
  content?: ReactElement;
  text?: string;
  buttons: {
    text: string;
    action?: string;
    disabled?: boolean;
  }[];
  modalHandler: (isVisible: boolean, action?: string) => void;
}

const Modal: FC<ModalProps> = ({
  openState,
  openModalButton,
  content,
  text,
  buttons,
  modalHandler,
}) => {
  const modalButtons = buttons.map((button) => {
    return (
      <Button
        key={uuidv4()}
        onClick={() => modalHandler(false, button.action)}
        disabled={button?.disabled ?? false}
      >
        {button.text}
      </Button>
    );
  });

  return (
    <Wrapper>
      {openModalButton}
      <Dialog open={openState} keepMounted onClose={() => modalHandler(false)}>
        <DialogContent>
          {content}
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {modalButtons}
          <Button onClick={() => modalHandler(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default Modal;
