import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import * as React from 'react'
import { useForm } from 'react-hook-form';
import { Input, Select } from '../../controls';

const statusOptions = [
    { id: 'Print', name: 'Print' },
    { id: 'Press', name: 'Press' },
    { id: 'Jahit', name: 'Jahit' },
    { id: 'Pending', name: 'Pending' },
    { id: 'Finishing', name: 'Finishing' }
];

const FormStatus = props => {
    const { status, setStatus, handleStatus } = props;

    const { control, handleSubmit, setValue } = useForm();

    React.useEffect(() => {
        if (status.keterangan) {
            setValue('keterangan', status.keterangan)
        }
        if (status.status) {
            setValue('status', status.status)
        }
    })

    const onClose = () => {
        setStatus({
            id: null,
            status: null,
            keterangan: null
        });
    }
    return (
        <Dialog
            maxWidth={'xs'}
            fullWidth
            open={status.id ? true : false}
            onClose={onClose}
        >
            <DialogTitle>Status</DialogTitle>
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
                    rules={{ required: false }}
                />
                <Select
                    name={'status'}
                    control={control}
                    label={'Status'}
                    options={statusOptions}
                    rules={{ required: true }}
                    defaultValue={""}
                />
                <Divider sx={{ pt: 3 }} />
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button variant='contained' color='error' onClick={onClose} sx={{ width: '-webkit-fill-available' }}>Batal</Button>
                <Button variant='contained' color='primary' onClick={handleSubmit(handleStatus)} sx={{ width: '-webkit-fill-available' }}>
                    Selesai
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FormStatus