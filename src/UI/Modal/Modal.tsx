import { useState, forwardRef } from 'react';

// types
import type { FC, ReactElement } from 'react';
import type { TransitionProps } from '@mui/material/transitions';

// mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

// styles
import { Wrapper } from './Modal.styles';

interface ModalProps {
  openState: boolean;
  openModalButton: ReactElement;
  content?: ReactElement;
  text?: string;
  confirmText: string;
  modalHandler: (visible: boolean) => void;
}

const Modal: FC<ModalProps> = ({
  openState,
  openModalButton,
  content,
  text,
  confirmText,
  modalHandler,
}) => {
  return (
    <Wrapper>
      {openModalButton}
      <Dialog open={openState} keepMounted onClose={() => modalHandler(false)}>
        <DialogContent>
          <Typography>upload image</Typography>
          {content}
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => modalHandler(false)}>{confirmText}</Button>
          <Button onClick={() => modalHandler(false)}>{confirmText}</Button>
          <Button onClick={() => modalHandler(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default Modal;
