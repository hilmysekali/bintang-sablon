import * as React from "react";
import { Checkbox, Chip, Collapse, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { DateInput, handleFocus, Input } from "../../controls"
import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';
import { NumericFormat } from "react-number-format";

const FormCheckout = props => {
    const {
        control,
        register,
        errors,
        watch,
        antrian
    } = props;

    const [detailOpen, setOpenDetail] = React.useState(false);

    const [size, setSize] = React.useState(0);
    const [additional, setAdditional] = React.useState(0);

    React.useEffect(() => {
        if (antrian) {
            setSize(antrian.antriansize.reduce((acc, item) => acc + (item.harga * item.qty), 0));
            setAdditional(antrian.antrianadditional.reduce((acc, item) => acc + (item.harga * item.qty), 0));
        }
    }, [antrian])
    return (
        <>
            <Grid container spacing={2}>
                {/* NOTA */}
                <Grid item xs={3}>Nota</Grid>
                <Grid item xs={1}>:</Grid>
                <Grid item xs={8}>{antrian.nota}</Grid>

                {/* NAMA */}
                <Grid item xs={3}>Nama</Grid>
                <Grid item xs={1}>:</Grid>
                <Grid item xs={8}>{antrian.nama}</Grid>

                {/* SOURCE */}
                <Grid item xs={3}>Source</Grid>
                <Grid item xs={1}>:</Grid>
                <Grid item xs={8}>{antrian.sourceorder.name}</Grid>

                {/* TOTAL */}
                <Grid item xs={3}>Total Bayar</Grid>
                <Grid item xs={1}>:</Grid>
                <Grid item xs={8}>
                    <NumericFormat
                        value={size + additional}
                        thousandSeparator
                        prefix='Rp. '
                        displayType="text" />
                </Grid>

                <Divider />
                <Grid item xs={12}>
                    <Input
                        rules={{ required: false }}
                        name={"keterangan_keluar"}
                        control={control}
                        label={"Catatan Keluar"}
                        defaultValue={""}
                        onFocus={handleFocus}
                        multiline
                        rows={4}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <DateInput
                        rules={{ required: 'Tanggal keluar harus di isi!' }}
                        name={'tanggal_keluar'}
                        control={control}
                        label={'Tanggal Keluar'}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl component="fieldset" variant="standard" error={errors.checked ? true : false}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox {...register(`checked`)} checked={watch('checked')} />} label="Apakah data sudah benar?" labelPlacement='start' />
                        </FormGroup>
                        <FormHelperText sx={{ ml: 2 }}>{errors.checked ? errors.checked.message : ''}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Divider>
                        <Chip icon={detailOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} label="Detail Order" onClick={() => detailOpen ? setOpenDetail(false) : setOpenDetail(true)} />
                    </Divider>
                </Grid>
            </Grid>
            <Collapse in={detailOpen}>
                <Grid container sx={{ pt: 1, pb: 1 }} spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table sx={{ minWidth: 'sm' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', color: 'skyblue' }}>Size</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'skyblue' }}>Qty</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'skyblue' }}>Harga Jual</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'skyblue' }}>Sub Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {antrian.antriansize.map((row) => (
                                        <TableRow
                                            key={row.id}
                                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">{row.size.name}</TableCell>
                                            <TableCell align="right">{row.qty}</TableCell>
                                            <TableCell align="right">
                                                <NumericFormat
                                                    value={row.harga}
                                                    thousandSeparator
                                                    prefix='Rp. '
                                                    displayType="text" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <NumericFormat
                                                    value={row.harga * row.qty}
                                                    thousandSeparator
                                                    prefix='Rp. '
                                                    displayType="text" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table sx={{ minWidth: 'sm' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', color: 'skyblue' }}>Tambahan</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'skyblue' }}>Qty</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'skyblue' }}>Harga Jual</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'skyblue' }}>Sub Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {antrian.antrianadditional.length > 0 ? antrian.antrianadditional.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">{row.additional.name}</TableCell>
                                            <TableCell align="right">{row.qty}</TableCell>
                                            <TableCell align="right">
                                                <NumericFormat
                                                    value={row.harga}
                                                    thousandSeparator
                                                    prefix='Rp. '
                                                    displayType="text" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <NumericFormat
                                                    value={row.harga * row.qty}
                                                    thousandSeparator
                                                    prefix='Rp. '
                                                    displayType="text" />
                                            </TableCell>
                                        </TableRow>
                                    )) :
                                        (
                                            <TableRow>
                                                <TableCell align="center" component="th" scope="row" colSpan={4}>Tidak ada tambahan!</TableCell>
                                            </TableRow>
                                        )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Collapse>
        </>

    )
}

export default FormCheckout