import * as React from 'react';
import PropTypes from 'prop-types';
import {
    styled,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Grid,
    Divider,
    Chip,
    Collapse,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    TextField,
    Tooltip,
    Skeleton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { api } from '../config/api';
import { NumericFormat } from 'react-number-format';
import { dateFormat } from './controls';

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
const DetailAntrian = props => {
    const { detailID, setDetailID } = props;
    const [detail, setDetail] = React.useState();
    const [openSize, setOpenSize] = React.useState(true);
    const [openKeterangan, setOpenKeterangan] = React.useState(false);
    React.useEffect(() => {

        if (detailID) {
            if (!detail) {
                const fetchData = async () => {
                    await api().get(`/api/antrian/${detailID}`).then((e) => {
                        if (e.status === 200) {
                            setDetail(e.data)
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
                }

                fetchData();
            }
        }
    }, [detail, detailID, setDetail]);

    return (
        <BootstrapDialog
            onClose={() => {
                setDetailID(null)
                setDetail()
            }}
            aria-labelledby="customized-dialog-title"
            fullWidth={true}
            maxWidth={'sm'}
            open={detailID ? true : false}
            scroll={'body'}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={() => {
                setDetailID(null)
                setDetail()
            }}>
                Detail Nota {detail && detail.nota}
            </BootstrapDialogTitle>
            <DialogContent dividers={true}>
                {detail ? (
                    <>
                        <Grid container spacing={2}>
                            <Grid container item pt={5}>
                                <Grid item md={2} xs={4}>Nota</Grid>
                                <Grid item md={1} xs={1}>:</Grid>
                                <Grid item md={3} xs={7}>{detail.nota}</Grid>

                                <Grid item md={2} xs={4}>Nama</Grid>
                                <Grid item md={1} xs={1}>:</Grid>
                                <Grid item md={3} xs={7} zeroMinWidth>
                                    <Tooltip title={detail.nama ?? ''}>
                                        <Typography noWrap>{detail.nama ?? '-'}</Typography>
                                    </Tooltip>
                                </Grid>
                            </Grid>

                            <Grid container item pt={5}>
                                <Grid item md={2} xs={4}>No. CP</Grid>
                                <Grid item md={1} xs={1}>:</Grid>
                                <Grid item md={3} xs={7}>{detail.no_hp ?? '-'}</Grid>

                                <Grid item md={2} xs={4}>Alamat</Grid>
                                <Grid item md={1} xs={1}>:</Grid>
                                <Grid item md={3} xs={7} zeroMinWidth>
                                    <Tooltip title={detail.alamat ?? ''}>
                                        <Typography noWrap>{detail.alamat ?? '-'}</Typography>
                                    </Tooltip>
                                </Grid>
                            </Grid>

                            <Grid container item pt={5}>
                                <Grid item md={2} xs={4}>Jenis Order</Grid>
                                <Grid item md={1} xs={1}>:</Grid>
                                <Grid item md={3} xs={7} zeroMinWidth>
                                    <Typography>{detail.jenisorder.name}</Typography>
                                </Grid>

                                <Grid item md={2} xs={4}>Source</Grid>
                                <Grid item md={1} xs={1}>:</Grid>
                                <Grid item md={3} xs={7}>
                                    <Typography>{detail.sourceorder.name}</Typography>
                                </Grid>
                            </Grid>

                            <Grid container item pt={5}>
                                <Grid item md={2} xs={4}>Total Qty.</Grid>
                                <Grid item md={1} xs={1}>:</Grid>
                                <Grid item md={3} xs={7}>
                                    <Typography>{detail.qty}</Typography>
                                </Grid>

                                <Grid item md={2} xs={4}>Total Bayar</Grid>
                                <Grid item md={1} xs={1}>:</Grid>
                                <Grid item md={3} xs={7}>
                                    <NumericFormat
                                        value={detail.nominal}
                                        thousandSeparator
                                        prefix='Rp. '
                                        displayType="text" />
                                </Grid>
                            </Grid>

                            <Grid container item pt={5}>
                                <Grid item md={2} xs={4}>Check In</Grid>
                                <Grid item md={1} xs={1}>:</Grid>
                                <Grid item md={3} xs={7} zeroMinWidth>
                                    <Typography noWrap>{dateFormat(detail.tanggal_masuk)}</Typography>
                                </Grid>

                                <Grid item md={2} xs={4}>Check Out</Grid>
                                <Grid item md={1} xs={1}>:</Grid>
                                <Grid item md={3} xs={7} zeroMinWidth>
                                    <Typography noWrap>{detail.tanggal_keluar ? dateFormat(detail.tanggal_keluar) : '-'}</Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider />
                            </Grid>

                            {/* Admin */}
                            <Grid container item pt={5}>
                                <Grid item md={2} xs={4}>CS Masuk</Grid>
                                <Grid item md={1} xs={1}>:</Grid>
                                <Grid item md={3} xs={7}>
                                    <Typography>{detail.cs_masuk_nama}</Typography>
                                </Grid>

                                <Grid item md={2} xs={4}>CS Keluar</Grid>
                                <Grid item md={1} xs={1}>:</Grid>
                                <Grid item md={3} xs={7}>
                                    <Typography>{detail.cs_keluar_nama ?? '-'}</Typography>
                                </Grid>
                            </Grid>

                            <Grid container item pt={5}>
                                <Grid item md={2} xs={4}>Desainer</Grid>
                                <Grid item md={1} xs={1}>:</Grid>
                                <Grid item md={3} xs={7} zeroMinWidth>
                                    <Tooltip title={detail.desainer ? detail.desainer.replaceAll(',', ', ') : ''}>
                                        <Typography noWrap>{detail.desainer ? detail.desainer.replaceAll(',', ', ') : '-'}</Typography>
                                    </Tooltip>
                                </Grid>

                                <Grid item md={2} xs={4}>Produksi</Grid>
                                <Grid item md={1} xs={1}>:</Grid>
                                <Grid item md={3} xs={7}>
                                    <Tooltip title={detail.produksi ? detail.produksi.replaceAll(',', ', ') : ''}>
                                        <Typography noWrap>{detail.produksi ? detail.produksi.replaceAll(',', ', ') : '-'}</Typography>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Detail */}
                        <Grid item xs={12} pt={2}>
                            <Divider>
                                <Chip icon={openSize ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} label="Detail Order" onClick={() => setOpenSize(openSize ? false : true)} />
                            </Divider>
                        </Grid>
                        <Collapse in={openSize}>
                            <Grid container sx={{ pt: 1, pb: 1 }} spacing={2}>
                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table sx={{ minWidth: 'md' }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', color: 'skyblue' }}>Size</TableCell>
                                                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'skyblue' }}>Qty</TableCell>
                                                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'skyblue' }}>Harga Jual</TableCell>
                                                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'skyblue' }}>Sub Total</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {detail.antriansize.map((row) => (
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
                                        <Table sx={{ minWidth: 'md' }} aria-label="simple table">
                                            {detail.antrianadditional.length > 0 && (
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 'bold', color: 'skyblue' }}>Tambahan</TableCell>
                                                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'skyblue' }}>Qty</TableCell>
                                                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'skyblue' }}>Harga Jual</TableCell>
                                                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'skyblue' }}>Sub Total</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                            )}
                                            <TableBody>
                                                {detail.antrianadditional.length > 0 && detail.antrianadditional.map((row) => (
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
                                                ))}
                                                {/* sx={detail.nominal_reject === 0 && { borderBottom: '1.1px solid white' }} */}
                                                <TableRow>
                                                    <TableCell component="th" scope="row" colSpan={2} sx={{ fontWeight: 'bold', color: 'green'}}>Total Bayar</TableCell>
                                                    <TableCell component="th" scope="row" colSpan={2} align="right" sx={{ fontWeight: 'bold', color: 'green'}}>
                                                        <NumericFormat
                                                            value={detail.nominal}
                                                            thousandSeparator
                                                            prefix='Rp. '
                                                            displayType="text" />
                                                    </TableCell>
                                                </TableRow>
                                                {detail.nominal_reject > 0 && (
                                                    <>
                                                        <TableRow>
                                                            <TableCell component={'th'} scope='row' colSpan={2} sx={{ fontWeight: 'bold', color: 'red', ...detail.nominal_reject !== 0 && { borderBottom: '1px' }  }}>Total Reject</TableCell>
                                                            <TableCell component="th" scope="row" colSpan={2} align="right" sx={{ fontWeight: 'bold', color: 'red', ...detail.nominal_reject !== 0 && { borderBottom: '1px' }  }}>
                                                                <NumericFormat
                                                                    value={detail.nominal_reject}
                                                                    thousandSeparator
                                                                    prefix='Rp. '
                                                                    displayType="text" />
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow sx={{ borderBottom: '1.1px solid white' }}>
                                                            <TableCell component={'th'} scope='row' colSpan={4} sx={{ paddingLeft: 0, paddingRight: 0 }}>
                                                                <TextField label='Keterangan Reject' InputProps={{
                                                                    sx: {
                                                                        fontSize: '12px',
                                                                    },
                                                                }} defaultValue={detail.keterangan_reject} disabled fullWidth multiline focused />
                                                            </TableCell>
                                                        </TableRow>
                                                    </>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Collapse>

                        {/* Detail Keterangan */}
                        <Grid item xs={12} pt={2}>
                            <Divider>
                                <Chip icon={openKeterangan ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} label="Detail Keterangan" onClick={() => setOpenKeterangan(openKeterangan ? false : true)} />
                            </Divider>
                        </Grid>
                        <Collapse in={openKeterangan}>
                            <Grid container sx={{ pt: 1, pb: 1 }} spacing={2}>
                                <Grid item xs={12}>
                                    <TextField label='Keterangan Masuk' InputProps={{
                                        sx: {
                                            fontSize: '12px',
                                        },
                                    }} defaultValue={detail.keterangan_masuk ? detail.keterangan_masuk : '-'} disabled fullWidth multiline focused />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label='Keterangan Desainer' InputProps={{
                                        sx: {
                                            fontSize: '12px',
                                        },
                                    }} defaultValue={detail.keterangan_desainer ? detail.keterangan_desainer : '-'} disabled fullWidth multiline focused />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label='Keterangan Produksi' InputProps={{
                                        sx: {
                                            fontSize: '12px',
                                        },
                                    }} defaultValue={detail.keterangan_produksi ? detail.keterangan_produksi : '-'} disabled fullWidth multiline focused />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label='Keterangan Keluar' InputProps={{
                                        sx: {
                                            fontSize: '12px',
                                        },
                                    }} defaultValue={detail.keterangan_keluar ? detail.keterangan_keluar : '-'} disabled fullWidth multiline focused />
                                </Grid>
                            </Grid>
                        </Collapse>
                    </>
                ) : (
                    <Grid container spacing={2}>
                        <Grid container item pt={5}>
                            <Grid item md={2} xs={4}>Nota</Grid>
                            <Grid item md={1} xs={1}>:</Grid>
                            <Grid item md={3} xs={7} sx={{ paddingRight: '15px' }}>
                                <Skeleton variant="rectangular" />
                            </Grid>

                            <Grid item md={2} xs={4}>Nama</Grid>
                            <Grid item md={1} xs={1}>:</Grid>
                            <Grid item md={3} xs={7} sx={{ paddingRight: '15px' }}>
                                <Skeleton variant="rectangular" />
                            </Grid>
                        </Grid>

                        <Grid container item pt={5}>
                            <Grid item md={2} xs={4}>No. CP</Grid>
                            <Grid item md={1} xs={1}>:</Grid>
                            <Grid item md={3} xs={7} sx={{ paddingRight: '15px' }}>
                                <Skeleton variant="rectangular" />
                            </Grid>

                            <Grid item md={2} xs={4}>Alamat</Grid>
                            <Grid item md={1} xs={1}>:</Grid>
                            <Grid item md={3} xs={7} sx={{ paddingRight: '15px' }}>
                                <Skeleton variant="rectangular" />
                            </Grid>
                        </Grid>

                        <Grid container item pt={5}>
                            <Grid item md={2} xs={4}>Jenis Order</Grid>
                            <Grid item md={1} xs={1}>:</Grid>
                            <Grid item md={3} xs={7} sx={{ paddingRight: '15px' }}>
                                <Skeleton variant="rectangular" />
                            </Grid>

                            <Grid item md={2} xs={4}>Source</Grid>
                            <Grid item md={1} xs={1}>:</Grid>
                            <Grid item md={3} xs={7} sx={{ paddingRight: '15px' }}>
                                <Skeleton variant="rectangular" />
                            </Grid>
                        </Grid>

                        <Grid container item pt={5}>
                            <Grid item md={2} xs={4}>Total Qty.</Grid>
                            <Grid item md={1} xs={1}>:</Grid>
                            <Grid item md={3} xs={7} sx={{ paddingRight: '15px' }}>
                                <Skeleton variant="rectangular" />
                            </Grid>

                            <Grid item md={2} xs={4}>Total Bayar</Grid>
                            <Grid item md={1} xs={1}>:</Grid>
                            <Grid item md={3} xs={7} sx={{ paddingRight: '15px' }}>
                                <Skeleton variant="rectangular" />
                            </Grid>
                        </Grid>

                        <Grid container item pt={5}>
                            <Grid item md={2} xs={4}>Check In</Grid>
                            <Grid item md={1} xs={1}>:</Grid>
                            <Grid item md={3} xs={7} sx={{ paddingRight: '15px' }}>
                                <Skeleton variant="rectangular" />
                            </Grid>

                            <Grid item md={2} xs={4}>Check Out</Grid>
                            <Grid item md={1} xs={1}>:</Grid>
                            <Grid item md={3} xs={7} sx={{ paddingRight: '15px' }}>
                                <Skeleton variant="rectangular" />
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        {/* Admin */}
                        <Grid container item pt={5}>
                            <Grid item md={2} xs={4}>CS Masuk</Grid>
                            <Grid item md={1} xs={1}>:</Grid>
                            <Grid item md={3} xs={7} sx={{ paddingRight: '15px' }}>
                                <Skeleton variant="rectangular" />
                            </Grid>

                            <Grid item md={2} xs={4}>CS Keluar</Grid>
                            <Grid item md={1} xs={1}>:</Grid>
                            <Grid item md={3} xs={7} sx={{ paddingRight: '15px' }}>
                                <Skeleton variant="rectangular" />
                            </Grid>
                        </Grid>

                        <Grid container item pt={5}>
                            <Grid item md={2} xs={4}>Desainer</Grid>
                            <Grid item md={1} xs={1}>:</Grid>
                            <Grid item md={3} xs={7} sx={{ paddingRight: '15px' }}>
                                <Skeleton variant="rectangular" />
                            </Grid>

                            <Grid item md={2} xs={4}>Produksi</Grid>
                            <Grid item md={1} xs={1}>:</Grid>
                            <Grid item md={3} xs={7} sx={{ paddingRight: '15px' }}>
                                <Skeleton variant="rectangular" />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} pt={2}>
                            <Divider>
                                <Chip icon={<KeyboardArrowDownIcon />} label="Detail Order" />
                            </Divider>
                        </Grid>
                        <Grid item xs={12} pt={2}>
                            <Divider>
                                <Chip icon={<KeyboardArrowDownIcon />} label="Detail Keterangan" />
                            </Divider>
                        </Grid>
                    </Grid>
                )}

            </DialogContent>
        </BootstrapDialog >
    );
}

export default DetailAntrian