import { Divider, Grid, Skeleton, TextField, Typography } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { useDispatch } from 'react-redux';
import { api } from '../../../config/api';
import { setNotification } from '../../../features/notificationSlice';
import { handleFocus } from '../../controls';

const FormPengaturan = props => {
    const { control, register, setValue } = props; // FormControl
    const { modal, setModal } = props // Modal Control
    const [size, setSize] = React.useState({});
    const [additional, setAdditional] = React.useState({});
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (modal.id) {
            const fetchData = async () => {
                await api().get(`api/hpp/${modal.id}`).then((e) => {
                    if (e.status === 200) {
                        setSize(e.data.size);
                        setAdditional(e.data.additional);
                        if (e.data.size.length) {
                            e.data.size.forEach((e) => {
                                setValue(`size.${e.id}.hpp`, `Rp. ${e.hpp}`);
                            })
                        }
                        if (e.data.additional.length) {
                            e.data.additional.forEach((e) => {
                                setValue(`additional.${e.id}.hpp`, `Rp. ${e.hpp}`);
                            })
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
    }, [modal.id, setValue, dispatch, setModal])
    return (
        <Grid container columnSpacing={2}>
            {/* JUDUL */}
            <Grid item xs={12} sx={{ textAlign: 'center', pb: 1 }}>
                <Typography sx={{ fontWeight: 'bold' }}>Size</Typography>
            </Grid>

            {size.length ? size.map((size) => (
                <Grid container key={size.id} sx={{ pt: 1, pb: 1 }} spacing={2}>
                    {/* ISI */}
                    <Grid item xs={3} sx={{ textAlign: 'right', placeSelf: 'center' }}>
                        <input type="hidden" {...register(`size.${size.id}.id`)} value={size.id} />
                        <Typography>{size.name}</Typography>
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={8}>
                        <Controller
                            control={control}
                            name={`size.${size.id}.hpp`}
                            defaultValue={0}
                            rules={
                                {
                                    required: 'Harga Harus di isi!',
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
                                        fullWidth
                                        focused
                                        label={`HPP (${size.name})`}
                                        error={error !== undefined}
                                        helperText={error ? error.message : ''}
                                    />
                                )
                            }
                        />
                    </Grid>
                </Grid>
            ))
                : (<>
                    <Grid container key={size.id} sx={{ p: 2 }} spacing={2}>
                        {/* ISI */}
                        <Grid item xs={3}>
                            <Skeleton variant="rectangular" />
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={8}>
                            <Skeleton variant="rectangular" />
                        </Grid>
                    </Grid>
                    <Grid container key={size.id} sx={{ p: 2 }} spacing={2}>
                        {/* ISI */}
                        <Grid item xs={3}>
                            <Skeleton variant="rectangular" />
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={8}>
                            <Skeleton variant="rectangular" />
                        </Grid>
                    </Grid>
                    <Grid container key={size.id} sx={{ p: 2 }} spacing={2}>
                        {/* ISI */}
                        <Grid item xs={3}>
                            <Skeleton variant="rectangular" />
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={8}>
                            <Skeleton variant="rectangular" />
                        </Grid>
                    </Grid>
                </>
                )}
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center', pb: 1, pt: 1 }}>
                <Typography sx={{ fontWeight: 'bold' }}>Additional</Typography>
            </Grid>
            {additional.length ? additional.map((additional) => (
                <Grid container key={additional.id} sx={{ pt: 1, pb: 1 }} spacing={2}>
                    <Grid item xs={3} sx={{ textAlign: 'right', placeSelf: 'center' }}>
                        <input type="hidden" {...register(`additional.${additional.id}.id`)} value={additional.id} />
                        <Typography>{additional.name}</Typography>
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={8}>
                        <Controller
                            control={control}
                            name={`additional.${additional.id}.hpp`}
                            defaultValue={0}
                            rules={
                                {
                                    required: 'Harga Harus di isi!',
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
                                        fullWidth
                                        label={`HPP (${additional.name})`}
                                        error={error !== undefined}
                                        helperText={error ? error.message : ''}
                                    />
                                )
                            }
                        />
                    </Grid>
                </Grid>
            ))
                : (
                    <>
                        <Grid container key={size.id} sx={{ p: 2 }} spacing={2}>
                            {/* ISI */}
                            <Grid item xs={3}>
                                <Skeleton variant="rectangular" />
                            </Grid>
                            <Grid item xs={1} />
                            <Grid item xs={8}>
                                <Skeleton variant="rectangular" />
                            </Grid>
                        </Grid>
                        <Grid container key={size.id} sx={{ p: 2 }} spacing={2}>
                            {/* ISI */}
                            <Grid item xs={3}>
                                <Skeleton variant="rectangular" />
                            </Grid>
                            <Grid item xs={1} />
                            <Grid item xs={8}>
                                <Skeleton variant="rectangular" />
                            </Grid>
                        </Grid>
                        <Grid container key={size.id} sx={{ p: 2 }} spacing={2}>
                            {/* ISI */}
                            <Grid item xs={3}>
                                <Skeleton variant="rectangular" />
                            </Grid>
                            <Grid item xs={1} />
                            <Grid item xs={8}>
                                <Skeleton variant="rectangular" />
                            </Grid>
                        </Grid>
                    </>
                )}
        </Grid>
    )
}

export default FormPengaturan;