import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Form } from '../../useForm';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Modal = ({ modal, handleClose, children, size, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        fullWidth={true}
        maxWidth={size}
        open={modal.isActive}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {modal.title}
        </BootstrapDialogTitle>
        <DialogContent dividers={true}>
          {children}
        </DialogContent>
        <DialogActions>
        <Button color="error" variant="outlined" onClick={handleSubmit}>
            Clear
          </Button>
          <Button variant="outlined" onClick={handleSubmit}>
            Simpan
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Form>
  );
}

export default Modal;