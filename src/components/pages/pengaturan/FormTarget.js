import { Grid, TextField } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { api } from '../../../config/api';
import { setNotification } from '../../../features/notificationSlice';
import { Select } from '../../controls';

const bulanOption = [
    { id: '1', name: 'Januari' },
    { id: '2', name: 'Februari' },
    { id: '3', name: 'Maret' },
    { id: '4', name: 'April' },
    { id: '5', name: 'Mei' },
    { id: '6', name: 'Juni' },
    { id: '7', name: 'Juli' },
    { id: '8', name: 'Agustus' },
    { id: '9', name: 'September' },
    { id: '10', name: 'Oktober' },
    { id: '11', name: 'November' },
    { id: '12', name: 'Desember' },
]

const tahunOption = [
    { id: '2021', name: '2021' },
    { id: '2022', name: '2022' },
    { id: '2023', name: '2023' },
    { id: '2024', name: '2024' },
    { id: '2025', name: '2025' },
    { id: '2026', name: '2026' },
    { id: '2027', name: '2027' },
    { id: '2028', name: '2028' },
    { id: '2029', name: '2029' },
    { id: '2030', name: '2030' },
    { id: '2031', name: '2031' },
]

const FormTarget = props => {
    const { modal, setModal } = props;
    const { control, setValue, dispatch } = props;

    React.useEffect(() => {
        if (modal.id) {
            const fetchData = async () => {
                await api().get(`api/target/${modal.id}`).then((e) => {
                    if (e.status === 200) {
                        setValue(`jumlah`, `Rp. ${e.data.jumlah}`);
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
        <Grid container spacing={2}>
            {modal.jenis === 'add' && (
                <>
                    <Grid item xs={6}>
                        <Select
                            name={'bulan'}
                            control={control}
                            label={'Bulan'}
                            options={bulanOption}
                            rules={{ required: 'Bulan harus di isi!' }}
                            defaultValue={""}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            name={'tahun'}
                            control={control}
                            label={'Tahun'}
                            options={tahunOption}
                            rules={{ required: 'Tahun harus di isi!' }}
                            defaultValue={""}
                        />
                    </Grid>
                </>
            )}

            <Grid item xs={12}>
                <Controller
                    control={control}
                    name={`jumlah`}
                    defaultValue={0}
                    rules={
                        {
                            required: 'Target Harus di isi!',
                            min: {
                                value: 1,
                                message: 'Target Harus di isi!'
                            },
                        }
                    }
                    render={
                        ({ field: { onChange, name, value }, fieldState: { error } }) => (
                            <NumericFormat
                                // onFocus={handleFocus}
                                name={name}
                                value={value}
                                onChange={onChange}
                                thousandSeparator
                                prefix='Rp. '
                                customInput={TextField}
                                size={'small'}
                                label={'Target'}
                                error={error !== undefined}
                                fullWidth
                                helperText={error ? error.message : ''}
                                variant='outlined'
                            />
                        )
                    }
                />
            </Grid>
        </Grid>
    )
}

export default FormTarget