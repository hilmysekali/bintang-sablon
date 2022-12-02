import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import * as React from 'react'
import { useForm } from 'react-hook-form';
import { Input } from '../../controls';

const FormPesan = props => {
    const { keterangan, setKeterangan, handlePesan } = props;

    const { control, handleSubmit, setValue } = useForm();

    React.useEffect(() => {
        if (keterangan.keterangan) {
            setValue('keterangan', keterangan.keterangan)
        }
    })

    const onClose = () => {
        setKeterangan({
            id: null,
            keterangan: null
        });
    }
    return (
        <Dialog
            maxWidth={'xs'}
            fullWidth
            open={keterangan.id ? true : false}
            onClose={onClose}
        >
            <DialogTitle>Keterangan</DialogTitle>
            <DialogContent>
                <Input
                    control={control}
                    margin="dense"
                    label="Catatan"
                    name={'keterangan'}
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    rules={{ required: true }}
                />
                <Divider sx={{ pt: 3 }} />
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button variant='contained' color='error' onClick={onClose} sx={{ width: '-webkit-fill-available' }}>Batal</Button>
                <Button variant='contained' color='primary' onClick={handleSubmit(handlePesan)} sx={{ width: '-webkit-fill-available' }}>
                    Selesai
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FormPesan