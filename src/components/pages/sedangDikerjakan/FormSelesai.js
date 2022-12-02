import * as React from 'react'
import {
    Checkbox,
    Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Grid,
    Switch,
    TextField,
    Chip,
    Box
} from "@mui/material";
import {
    KeyboardArrowUp as KeyboardArrowUpIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon
} from '@mui/icons-material';
import { handleFocus, Input } from '../../controls';
import { Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

const FormSelesai = props => {
    const {
        control,
        register,
        handleSubmit,
        errors,
        watch,
        handleClose,
        handleSelesai,
        setValue,
        modal
    } = props;
    const [rejectOpen, setRejectOpen] = React.useState(false);

    React.useEffect(() => {
        if (modal.catatan) {
            setValue('keterangan', modal.catatan);
        }
    })
    return (
        <Dialog
            maxWidth={'xs'}
            fullWidth
            open={modal.jenis === 'desainer' || modal.jenis === 'produksi' ? true : false}
            onClose={handleClose}
        >
            <DialogTitle>
                {modal.title}
            </DialogTitle>
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
                <Divider sx={{ display: modal.jenis === 'desainer' && 'none' }}>
                    <Chip icon={rejectOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} label="Reject" onClick={() => rejectOpen ? setRejectOpen(false) : setRejectOpen(true)} />
                </Divider>
                <Collapse in={rejectOpen}>
                    <Grid container sx={{ pt: 1, pb: 1 }} spacing={2}>
                        <Grid item xs={6} sx={{ textAlign: 'right' }}>
                            <FormControlLabel
                                control=
                                {<Switch
                                    color="primary"
                                    {...register(`reject`, { value: false })}
                                    checked={watch(`reject`)}
                                />}
                                label={'Tambah Reject'}
                                labelPlacement="start"
                            />
                        </Grid>
                        {/* <Grid item xs={1} /> */}
                        <Grid item xs={6}>
                            <Controller
                                control={control}
                                name={`nominal_reject`}
                                defaultValue={0}
                                rules={
                                    {
                                        required: watch(`reject`) ? 'Nominal Harus di isi!' : false,
                                        min: {
                                            value: watch(`reject`) ? 1 : 0,
                                            message: 'Nominal Harus di isi!'
                                        },
                                    }
                                }
                                render={
                                    ({ field: { onChange, name, value }, fieldState: { error } }) => (
                                        <NumericFormat
                                            onFocus={handleFocus}
                                            name={name}
                                            value={value}
                                            onChange={onChange}
                                            thousandSeparator
                                            prefix='Rp. '
                                            variant={'filled'}
                                            customInput={TextField}
                                            size={'small'}
                                            focused
                                            disabled={!watch(`reject`)}
                                            label={watch(`reject`) ? `Nominal Reject` : ''}
                                            error={error !== undefined}
                                            helperText={error ? error.message : ''}
                                        />
                                    )
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                rules={{ required: watch(`reject`) ? 'Keterangan Wajib di isi!' : false }}
                                name={"keterangan_reject"}
                                control={control}
                                label={"Keterangan Reject"}
                                defaultValue={""}
                                multiline
                                rows={4}
                                disabled={watch('reject') ? false : true}
                            />
                        </Grid>
                    </Grid>
                </Collapse>
                <Divider sx={{ pt: 3 }} />
                <Box sx={{ display: 'flex' }}>
                    <FormControl component="fieldset" variant="standard" error={errors.checked ? true : false}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox {...register(`checked`)} checked={watch('checked')} />} label="Apakah data sudah benar?" labelPlacement='start' />
                        </FormGroup>
                        <FormHelperText sx={{ ml: 2 }}>{errors.checked ? errors.checked.message : ''}</FormHelperText>
                    </FormControl>
                </Box>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button variant='contained' color='error' onClick={handleClose} sx={{ width: '-webkit-fill-available' }}>Batal</Button>
                <Button variant='contained' color='primary' onClick={handleSubmit(handleSelesai)} sx={{ width: '-webkit-fill-available' }}>
                    Selesai
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FormSelesai