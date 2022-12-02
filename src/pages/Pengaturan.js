import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Paper, Skeleton, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Layout from '../layout/Layout';
import { create_data, delete_data, get_data, update_data } from '../config/api';
import { ActionButton, AddButton } from '../components/controls';
import { Modal } from '../components/Layout/Content';
import { useForm } from 'react-hook-form';
import FormPengaturan from '../components/pages/pengaturan/FormPengaturan';
import { useDispatch } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import Target from '../components/pages/pengaturan/Target';
import { updateLoading } from '../features/themeSlice';
import { setNotification } from '../features/notificationSlice';
import column from './../components/pages/pengaturan/column'
import { GridActionsCellItem } from '@mui/x-data-grid';
import FormTarget from '../components/pages/pengaturan/FormTarget';
import bulan from '../config/bulan';
import DialogHapus from '../components/DialogHapus';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Pengaturan = props => {
    const [tab, setTab] = React.useState(0);

    const [table, setTable] = React.useState({});
    const [size, setSize] = React.useState({});
    const [additional, setAdditional] = React.useState({});
    const [modal, setModal] = React.useState({
        id: null,
        jenis: null,
        title: null,
    });

    const columnTarget = column.map((e) => {
        if (e.field === 'actions') {
            return {
                ...e,
                getActions: (params) => {
                    return ([
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            onClick={() => setModal({ id: params.id, jenis: 'edit', title: `Edit Target Bulan ${bulan[params.row.bulan - 1]} ${params.row.tahun}` })}
                            showInMenu
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={() => setModal({ id: params.id, jenis: 'hapus', title: `Hapus Target Bulan ${bulan[params.row.bulan - 1]} ${params.row.tahun}` })}
                            showInMenu
                        />
                    ]);
                }
            }
        }
        return e;
    });

    const { control, register, watch, setValue, handleSubmit } = useForm();

    const dispatch = useDispatch();

    const [pageState, setPageState] = React.useState({
        endpoint: 'target',
        loading: true,
        data: [],
        total: 0,
        page: 1,
        pageSize: 10,
        totalPage: 0,
        sortModel: [{
            field: 'bulan',
            sort: 'asc'
        }],
        filter: {
            field: '',
            value: ''
        },
        search: ''
    });

    React.useEffect(() => {
        get_data({
            endpoint: pageState.endpoint,
            pageSize: pageState.pageSize,
            page: pageState.page,
            sort_field: pageState.sortModel[0].field,
            sort_direction: pageState.sortModel[0].sort,
            search: pageState.search,
            filter_field: '',
            filter_value: '',
        }).then((e) => {
            if (e.status === 200) {
                if (e.status === 200) {
                    setPageState((old) => ({ ...old, data: e.data.data, total: e.data.total, totalPage: e.data.last_page }));
                }
                setPageState((old) => ({ ...old, loading: false }));
                dispatch(updateLoading(false));
            }
        }).catch((e) => {
            setPageState((old) => ({ ...old, loading: false }));
            dispatch(updateLoading(false));
            dispatch(
                setNotification(
                    {
                        snackbarOpen: true,
                        snackbarType: "error",
                        snackbarMessage: "Gagal Memuat Data! Silahkan periksa koneksi internet anda!"
                    }
                ));
        })
    }, [dispatch, pageState.endpoint, pageState.pageSize, pageState.page, pageState.sortModel, pageState.search]);

    React.useEffect(() => {
        dispatch(updateLoading(true));
        get_data({ endpoint: 'hpp' }).then((e) => {
            dispatch(updateLoading(false));
            if (e.status === 200) {
                setTable(e.data.table)
                setSize(e.data.size)
                setAdditional(e.data.additional)
            }
        }).catch((e) => {
            dispatch(updateLoading(false));
            dispatch(
                setNotification(
                    {
                        snackbarOpen: true,
                        snackbarType: "error",
                        snackbarMessage: "Gagal Memuat Data! Silahkan periksa koneksi internet anda!"
                    }
                ));
        })
    }, [dispatch, setTable, setSize, setAdditional])

    const onSubmit = (props) => {
        dispatch(updateLoading(true));
        const data = props;
        const newSize = props.size.map((x) => {
            const hpp = x.hpp.split("Rp. ")[1].trim().replace(/,(?=\d{3})/g, '');
            return { ...x, hpp: parseFloat(hpp) }
        });

        const newAdditional = props.additional.map((x) => {
            const hpp = x.hpp.split("Rp. ")[1].trim().replace(/,(?=\d{3})/g, '');
            return { ...x, hpp: parseFloat(hpp) }
        });
        data.size = newSize;
        data.additional = newAdditional;
        update_data({ endpoint: 'hpp', id: modal.id, values: data }).then((e) => {
            dispatch(updateLoading(false));
            dispatch(
                setNotification(
                    {
                        snackbarOpen: true,
                        snackbarType: "success",
                        snackbarMessage: 'HPP Berhasil di perbaharui!'
                    }
                ));
            handleClose();
            get_data({ endpoint: 'hpp' }).then((e) => {
                if (e.status === 200) {
                    setTable(e.data.table)
                    setSize(e.data.size)
                    setAdditional(e.data.additional)
                }
            })
        }).catch((e) => {
            dispatch(updateLoading(false));
            dispatch(
                setNotification(
                    {
                        snackbarOpen: true,
                        snackbarType: "error",
                        snackbarMessage: "HPP Gagal di perbaharui!"
                    }
                ));
        })
    }

    const onSubmitTarget = props => {
        dispatch(updateLoading(true));
        const jumlah = props.jumlah.split("Rp. ")[1].trim().replace(/,(?=\d{3})/g, '');
        if (modal.jenis === 'add') {
            const data = {
                bulan: props.bulan,
                tahun: props.tahun,
                jumlah
            }
            create_data({ endpoint: 'target', values: data }).then((e) => {
                dispatch(updateLoading(false));
                if (e.status === 201) {
                    dispatch(
                        setNotification(
                            {
                                snackbarOpen: true,
                                snackbarType: "success",
                                snackbarMessage: 'Target Berhasil di tambah!'
                            }
                        ));
                    get_data({
                        endpoint: pageState.endpoint,
                        pageSize: pageState.pageSize,
                        page: pageState.page,
                        sort_field: pageState.sortModel[0].field,
                        sort_direction: pageState.sortModel[0].sort,
                        search: pageState.search,
                        filter_field: '',
                        filter_value: '',
                    }).then((e) => {
                        if (e.status === 200) {
                            if (e.status === 200) {
                                setPageState((old) => ({ ...old, data: e.data.data, total: e.data.total, totalPage: e.data.last_page }));
                            }
                            setPageState((old) => ({ ...old, loading: false }));
                            dispatch(updateLoading(false));
                        }
                    }).catch((e) => {
                        setPageState((old) => ({ ...old, loading: false }));
                        dispatch(updateLoading(false));
                        dispatch(
                            setNotification(
                                {
                                    snackbarOpen: true,
                                    snackbarType: "error",
                                    snackbarMessage: "Gagal Memuat Data! Silahkan periksa koneksi internet anda!"
                                }
                            ));
                    })
                } else {
                    dispatch(
                        setNotification(
                            {
                                snackbarOpen: true,
                                snackbarType: "error",
                                snackbarMessage: 'Target Gagal di tambah!'
                            }
                        ));
                }
                handleClose();
            }).catch((e) => {
                dispatch(updateLoading(false));
                dispatch(
                    setNotification(
                        {
                            snackbarOpen: true,
                            snackbarType: "error",
                            snackbarMessage: "Target Gagal di tambah!"
                        }
                    ));
            })
        }
        if (modal.jenis === 'edit') {
            const data = {
                jumlah
            }
            update_data({ endpoint: 'target', id: modal.id, values: data }).then((e) => {
                dispatch(updateLoading(false));
                if (e.status === 200) {
                    dispatch(
                        setNotification(
                            {
                                snackbarOpen: true,
                                snackbarType: "success",
                                snackbarMessage: 'Target Berhasil di perbaharui!'
                            }
                        ));
                    get_data({
                        endpoint: pageState.endpoint,
                        pageSize: pageState.pageSize,
                        page: pageState.page,
                        sort_field: pageState.sortModel[0].field,
                        sort_direction: pageState.sortModel[0].sort,
                        search: pageState.search,
                        filter_field: '',
                        filter_value: '',
                    }).then((e) => {
                        if (e.status === 200) {
                            if (e.status === 200) {
                                setPageState((old) => ({ ...old, data: e.data.data, total: e.data.total, totalPage: e.data.last_page }));
                            }
                            setPageState((old) => ({ ...old, loading: false }));
                            dispatch(updateLoading(false));
                        }
                    }).catch((e) => {
                        setPageState((old) => ({ ...old, loading: false }));
                        dispatch(updateLoading(false));
                        dispatch(
                            setNotification(
                                {
                                    snackbarOpen: true,
                                    snackbarType: "error",
                                    snackbarMessage: "Gagal Memuat Data! Silahkan periksa koneksi internet anda!"
                                }
                            ));
                    })
                } else {
                    dispatch(
                        setNotification(
                            {
                                snackbarOpen: true,
                                snackbarType: "error",
                                snackbarMessage: 'Target Gagal di perbaharui!'
                            }
                        ));
                }
                handleClose();
            }).catch((e) => {
                dispatch(updateLoading(false));
                dispatch(
                    setNotification(
                        {
                            snackbarOpen: true,
                            snackbarType: "error",
                            snackbarMessage: "Target Gagal di tambah!"
                        }
                    ));
            })
        }

    }

    const onDelete = () => {
        dispatch(updateLoading(true));
        delete_data({ endpoint: 'target', id: modal.id }).then((e) => {
            dispatch(updateLoading(false));
            if (e.status === 200) {
                dispatch(
                    setNotification(
                        {
                            snackbarOpen: true,
                            snackbarType: "success",
                            snackbarMessage: 'Target Berhasil di hapus!'
                        }
                    ));
                get_data({
                    endpoint: pageState.endpoint,
                    pageSize: pageState.pageSize,
                    page: pageState.page,
                    sort_field: pageState.sortModel[0].field,
                    sort_direction: pageState.sortModel[0].sort,
                    search: pageState.search,
                    filter_field: '',
                    filter_value: '',
                }).then((e) => {
                    if (e.status === 200) {
                        if (e.status === 200) {
                            setPageState((old) => ({ ...old, data: e.data.data, total: e.data.total, totalPage: e.data.last_page }));
                        }
                        setPageState((old) => ({ ...old, loading: false }));
                        dispatch(updateLoading(false));
                    }
                }).catch((e) => {
                    setPageState((old) => ({ ...old, loading: false }));
                    dispatch(updateLoading(false));
                    dispatch(
                        setNotification(
                            {
                                snackbarOpen: true,
                                snackbarType: "error",
                                snackbarMessage: "Gagal Memuat Data! Silahkan periksa koneksi internet anda!"
                            }
                        ));
                })
            } else {
                dispatch(
                    setNotification(
                        {
                            snackbarOpen: true,
                            snackbarType: "error",
                            snackbarMessage: 'Target Gagal di hapus!'
                        }
                    ));
            }
            handleClose();
        }).catch((e) => {
            dispatch(updateLoading(false));
            dispatch(
                setNotification(
                    {
                        snackbarOpen: true,
                        snackbarType: "error",
                        snackbarMessage: "Target Gagal di tambah!"
                    }
                ));
        });
    }

    const handleClose = () => {
        setModal({
            id: null,
            jenis: null,
            title: null
        });
    };
    return (
        <Layout>
            {/* Title Container */}
            <Typography>Pengaturan</Typography>

            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={tab} onChange={(event, value) => setTab(value)} centered>
                    <Tab {...a11yProps(0)} label="Target" />
                    <Tab {...a11yProps(1)} label="HPP" />
                </Tabs>
            </Box>
            {/* Content */}
            <TabPanel value={tab} index={0}>
                <Stack
                    sx={{ pb: 3 }}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Typography sx={{ fontWeight: 600 }}></Typography>
                    <AddButton title='Target' onClick={() => setModal({ id: null, jenis: 'add', title: 'Tambah Target' })} />
                </Stack>
                <Target {...{ pageState, setPageState, columnTarget }} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <div style={{ paddingBottom: 20, paddingTop: 20 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#dae0e8' }}>
                                    <TableCell key={0} align='center' sx={{ fontWeight: 'bold' }} width={10}>Size</TableCell>
                                    {table.length ? table.map((row) => (
                                        <TableCell key={row.id} align='right' sx={{ fontWeight: 'bold' }} width={50}>
                                            {row.name}
                                            <IconButton aria-label="delete" onClick={() => setModal({ id: row.id, jenis: 'selesai', title: `HPP ${row.name}` })}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    )) : (
                                        <>
                                            <TableCell><Skeleton variant="rectangular" /></TableCell>
                                            <TableCell><Skeleton variant="rectangular" /></TableCell>
                                            <TableCell><Skeleton variant="rectangular" /></TableCell>
                                        </>
                                    )}

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {size.length ? size.map((row2) => (
                                    <TableRow
                                        key={row2.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" align='center'>
                                            {row2.nama}
                                        </TableCell>
                                        {table.length && table.map((jdl) => (
                                            <TableCell key={jdl.id} align='right'>
                                                <NumericFormat
                                                    value={row2[jdl.name]}
                                                    thousandSeparator
                                                    prefix='Rp. '
                                                    displayType="text" />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )) : (
                                    <>
                                        <TableRow>
                                            <TableCell colSpan={4}><Skeleton variant="rectangular" /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={4}><Skeleton variant="rectangular" /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={4}><Skeleton variant="rectangular" /></TableCell>
                                        </TableRow>
                                    </>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{ paddingBottom: 20, paddingTop: 20 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#dae0e8' }}>
                                    <TableCell key={0} align='center' sx={{ fontWeight: 'bold' }} width={10}>Additional</TableCell>
                                    {table.length ? table.map((row) => (
                                        <TableCell key={row.id} align='right' sx={{ fontWeight: 'bold' }} width={50}>
                                            {row.name}
                                        </TableCell>
                                    )) : (
                                        <>
                                            <TableCell><Skeleton variant="rectangular" /></TableCell>
                                            <TableCell><Skeleton variant="rectangular" /></TableCell>
                                            <TableCell><Skeleton variant="rectangular" /></TableCell>
                                        </>
                                    )}

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {additional.length ? additional.map((row2) => (
                                    <TableRow
                                        key={row2.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" align='center'>
                                            {row2.nama}
                                        </TableCell>
                                        {table.length && table.map((jdl) => (
                                            <TableCell key={jdl.id} align='right'>
                                                <NumericFormat
                                                    value={row2[jdl.name]}
                                                    thousandSeparator
                                                    prefix='Rp. '
                                                    displayType="text" />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )) : (
                                    <>
                                        <TableRow>
                                            <TableCell colSpan={4}><Skeleton variant="rectangular" /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={4}><Skeleton variant="rectangular" /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={4}><Skeleton variant="rectangular" /></TableCell>
                                        </TableRow>
                                    </>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </TabPanel>


            <Modal
                size="sm"
                jenis={modal.jenis === 'selesai' ? 'selesai' : ''}
                {...{ handleClose, handleSubmit, onSubmit, title: modal.title }}
                action={<ActionButton color='error' title='Batal' onClick={() => setModal({ id: null, jenis: null, title: null })} />}
                form={<FormPengaturan {...{ control, register, watch, setValue, modal, setModal }} />}
            />

            <Modal
                size="sm"
                jenis={modal.jenis === 'add' ? 'add' : modal.jenis === 'edit' ? 'edit' : ''}
                {...{ handleClose, handleSubmit, onSubmit: onSubmitTarget, title: modal.title }}
                action={<ActionButton color='error' title='Batal' onClick={() => setModal({ id: null, jenis: null, title: null })} />}
                form={<FormTarget {...{ modal, setModal, control, setValue, dispatch }} />}
            />

            <DialogHapus {...{ modal, setModal, onDelete }} />
        </Layout>
    );
}

export default Pengaturan;