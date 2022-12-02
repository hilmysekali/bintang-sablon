import React from 'react';
import { Chip, Collapse, Divider, FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { DateInput, Input, Select } from '../../controls';
import { handleFocus } from '../../controls';
import { api } from '../../../config/api';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../../features/notificationSlice';

const FormAntrian = props => {
    const { control, register, watch, clearErrors, setValue } = props;
    const { jenisOrder, sourceOrder, size, additional, modal, user, setModal } = props;
    const [detailOpen, setOpenDetail] = React.useState(false);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (modal.id && modal.jenis === 'edit') {
            const fetchData = async () => {
                await api().get(`api/antrian/${modal.id}`).then((e) => {
                    if (e.status === 200) {
                        setOpenDetail(true);
                        const antrian = e.data;
                        setValue('nota', antrian.nota);
                        setValue('tanggal_masuk', antrian.tanggal_masuk);
                        setValue('nama', antrian.nama);
                        setValue('no_hp', antrian.no_hp);
                        setValue('alamat', antrian.alamat);
                        if (jenisOrder.length) {
                            setValue('jenisorder_id', antrian.jenisorder_id);
                        }
                        if (sourceOrder.length) {
                            setValue('sourceorder_id', antrian.sourceorder_id);
                        }
                        if (size.length) {
                            if (antrian.antriansize.length) {
                                antrian.antriansize.forEach((e) => {
                                    setValue(`detail.size.${e.size_id}.isActive`, true);
                                    setValue(`detail.size.${e.size_id}.qty`, e.qty);
                                    setValue(`detail.size.${e.size_id}.harga`, `Rp. ${e.harga}`);
                                })
                            }
                        }
                        if (additional.length) {
                            if (antrian.antrianadditional.length) {
                                antrian.antrianadditional.forEach((e) => {
                                    setValue(`detail.additional.${e.additional_id}.isActive`, true);
                                    setValue(`detail.additional.${e.additional_id}.qty`, e.qty);
                                    setValue(`detail.additional.${e.additional_id}.harga`, `Rp. ${e.harga}`);
                                })
                            }
                        }
                    } else {
                        setModal({ id: null, jenis: null, title: null })
                        dispatch(
                            setNotification(
                                {
                                    snackbarOpen: true,
                                    snackbarType: "error",
                                    snackbarMessage: "Gagal! Silahkan Coba Lagi!"
                                }
                            ));

                    }
                }).catch((error) => {
                    setModal({ id: null, jenis: null, title: null })
                    dispatch(
                        setNotification(
                            {
                                snackbarOpen: true,
                                snackbarType: "error",
                                snackbarMessage: "Gagal! Silahkan Coba Lagi!"
                            }
                        ));
                })
            }
            fetchData();
        }
    }, [modal.id, modal.jenis, setValue, setOpenDetail, additional.length, size.length, sourceOrder.length, jenisOrder.length, dispatch, setModal])

    React.useEffect(() => {
        const generateAntrian = async () => {
            await api().get('api/antrian/generate').then((e) => {
                setValue('nota', e.data);
            }).catch(() => {
                setModal({ id: null, jenis: null, title: null })
                dispatch(
                    setNotification(
                        {
                            snackbarOpen: true,
                            snackbarType: "error",
                            snackbarMessage: "Gagal! Silahkan Coba Lagi!"
                        }
                    ));
            })
        }
        if (watch('nota') === '' && !modal.id && modal.jenis === 'add') {
            generateAntrian();
        }
    })

    const handleDetail = (props) => {
        if (!props) {
            setOpenDetail(true)
        } else {
            setOpenDetail(false)
        }
    }

    const handleChange = (type, value, index) => {
        if (!value) {
            clearErrors(`detail.${type}.${index}`);
        }
        setValue(`detail.${type}.${index}.isActive`, value);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Input
                        disabled={true}
                        rules={{ required: 'No. Nota Harus di isi!' }}
                        name={"nota"}
                        control={control}
                        label={"No. Nota"}
                        defaultValue={""}
                        onFocus={handleFocus}
                    />
                </Grid>
                <Grid item xs={6}>
                    <DateInput
                        rules={{ required: 'Tanggal harus di isi!' }}
                        name={'tanggal_masuk'}
                        control={control}
                        label={'Tanggal Masuk'}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Input
                        rules={{ required: 'Nama Harus di isi!' }}
                        name={"nama"}
                        control={control}
                        label={"Nama"}
                        defaultValue={""}
                        onFocus={handleFocus}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Input
                        rules={{ required: false }}
                        name={"no_hp"}
                        control={control}
                        label={"No. HP"}
                        defaultValue={""}
                        onFocus={handleFocus}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Input
                        rules={{ required: false }}
                        name={"alamat"}
                        control={control}
                        label={"Alamat"}
                        defaultValue={""}
                        rows={2}
                        multiline
                        onFocus={handleFocus}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Select
                        disabled={jenisOrder.length ? false : true}
                        name={'jenisorder_id'}
                        control={control}
                        label={'Jenis Order'}
                        options={jenisOrder}
                        rules={{ required: true }}
                        defaultValue={""}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Select
                        disabled={sourceOrder.length ? false : true}
                        name={'sourceorder_id'}
                        control={control}
                        label={'Source Order'}
                        options={sourceOrder}
                        rules={{ required: true }}
                        defaultValue={""}
                    />
                </Grid>
                <Grid item xs={12} sx={{ display: user.role === 'customer_service' && modal.id && 'none' }}>
                    <Divider>
                        <Chip icon={detailOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} label="Detail Order" onClick={() => handleDetail(detailOpen)} />
                    </Divider>
                </Grid>
            </Grid>
            <Collapse in={detailOpen} sx={{ display: user.role === 'customer_service' && modal.id && 'none' }}>
                {size.length && size.map((size) => (
                    <Grid container key={size.id} sx={{ pt: 1, pb: 1 }} spacing={2}>
                        <Grid item xs={3} sx={{ textAlign: 'right' }}>
                            <input type="hidden" {...register(`detail.size.${size.id}.size_id`)} value={size.id} />
                            <FormControlLabel
                                control=
                                {<Switch
                                    color="primary"
                                    key={size.id} // important to include key with field's id
                                    {...register(`detail.size.${size.id}.isActive`, { value: false })}
                                    onChange={(e) => handleChange('size', e.target.checked, size.id)}
                                    checked={watch(`detail.size.${size.id}.isActive`)}
                                />}
                                label={size.name}
                                labelPlacement="start"
                            />
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={3}>
                            <Controller
                                control={control}
                                name={`detail.size.${size.id}.qty`}
                                defaultValue={0}
                                rules={
                                    {
                                        required: watch(`detail.size.${size.id}.isActive`) ? 'Qty Harus di isi!' : false,
                                        min: {
                                            value: watch(`detail.size.${size.id}.isActive`) ? 1 : 0,
                                            message: 'Qty Harus di isi!'
                                        },
                                    }
                                }
                                render={
                                    ({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            onFocus={handleFocus}
                                            type="number"
                                            variant='filled'
                                            disabled={!watch(`detail.size.${size.id}.isActive`)}
                                            size='small'
                                            focused label={watch(`detail.size.${size.id}.isActive`) ? `Qty (${size.name})` : ''}
                                            error={error !== undefined}
                                            helperText={error ? error.message : ''}
                                        />
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <Controller
                                control={control}
                                name={`detail.size.${size.id}.harga`}
                                defaultValue={0}
                                rules={
                                    {
                                        required: watch(`detail.size.${size.id}.isActive`) ? 'Harga Harus di isi!' : false,
                                        min: {
                                            value: watch(`detail.size.${size.id}.isActive`) ? 1 : 0,
                                            message: 'Harga Harus di isi!'
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
                                            disabled={!watch(`detail.size.${size.id}.isActive`)}
                                            label={watch(`detail.size.${size.id}.isActive`) ? `Harga (${size.name})` : ''}
                                            error={error !== undefined}
                                            helperText={error ? error.message : ''}
                                        />
                                    )
                                }
                            />
                        </Grid>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Divider>Additional</Divider>
                </Grid>
                {additional.length &&
                    additional.map((additional) => (
                        <Grid container key={additional.id} sx={{ pt: 1, pb: 1 }} spacing={2}>
                            <Grid item xs={3} sx={{ textAlign: 'right' }}>
                                <input type="hidden" {...register(`detail.additional.${additional.id}.additional_id`)} value={additional.id} />
                                <FormControlLabel
                                    control=
                                    {<Switch
                                        color="primary"
                                        key={additional.id} // important to include key with field's id
                                        {...register(`detail.additional.${additional.id}.isActive`, { value: false })}
                                        onChange={(e) => handleChange('additional', e.target.checked, additional.id)}
                                        checked={watch(`detail.additional.${additional.id}.isActive`)}
                                    />}
                                    label={additional.name}
                                    labelPlacement="start"
                                />
                            </Grid>
                            <Grid item xs={1} />
                            <Grid item xs={3}>
                                <Controller
                                    control={control}
                                    name={`detail.additional.${additional.id}.qty`}
                                    defaultValue={0}
                                    rules={
                                        {
                                            required: watch(`detail.additional.${additional.id}.isActive`) ? 'Qty Harus di isi!' : false,
                                            min: {
                                                value: watch(`detail.additional.${additional.id}.isActive`) ? 1 : 0,
                                                message: 'Qty Harus di isi!'
                                            },
                                        }
                                    }
                                    render={
                                        ({ field, fieldState: { error } }) => (
                                            <TextField
                                                {...field}
                                                onFocus={handleFocus}
                                                type="number"
                                                variant='filled'
                                                disabled={!watch(`detail.additional.${additional.id}.isActive`)}
                                                size='small'
                                                focused label={watch(`detail.additional.${additional.id}.isActive`) ? `Qty (${additional.name})` : ''}
                                                error={error !== undefined}
                                                helperText={error ? error.message : ''}
                                            />
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <Controller
                                    control={control}
                                    name={`detail.additional.${additional.id}.harga`}
                                    defaultValue={0}
                                    rules={
                                        {
                                            required: watch(`detail.additional.${additional.id}.isActive`) ? 'Harga Harus di isi!' : false,
                                            min: {
                                                value: watch(`detail.additional.${additional.id}.isActive`) ? 1 : 0,
                                                message: 'Harga Harus di isi!'
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
                                                disabled={!watch(`detail.additional.${additional.id}.isActive`)}
                                                label={watch(`detail.additional.${additional.id}.isActive`) ? `Harga (${additional.name})` : ''}
                                                error={error !== undefined}
                                                helperText={error ? error.message : ''}
                                            />
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>
                    ))}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            rules={{ required: false }}
                            name={"keterangan"}
                            control={control}
                            label={"Keterangan"}
                            defaultValue={""}
                            onFocus={handleFocus}
                            multiline
                            rows={4}
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </>

    )
}

export default FormAntrian;