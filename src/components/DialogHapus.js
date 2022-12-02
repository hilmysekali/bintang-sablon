import { ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material'
import React from 'react'

const DialogHapus = (props) => {
    const { modal, setModal, onDelete } = props;
    return (
        <Dialog
            maxWidth={'xs'}
            fullWidth
            open={modal.jenis === 'hapus'}
            onClose={() => setModal({ id: null, jenis: null, title: null })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle sx={{ alignSelf: 'center' }}>
                {modal.title}
            </DialogTitle>
            <DialogContent sx={{ alignSelf: 'center' }}>
                <ErrorOutlineIcon sx={{ fontSize: 100 }} color='warning' />
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button variant='contained' color='info' onClick={() => setModal({ id: null, jenis: null, title: null })} sx={{ width: '-webkit-fill-available' }}>Batal</Button>
                <Button variant='contained' color='error' onClick={() => onDelete()} autoFocus sx={{ width: '-webkit-fill-available' }}>
                    Selesai
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogHapus