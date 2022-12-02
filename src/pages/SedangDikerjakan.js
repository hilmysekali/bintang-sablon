import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, Grid, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import Layout from '../layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { Data } from '../components/Layout/Content';
import getData from '../components/getData';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Info as InfoIcon, Done as DoneIcon, Message as MessageIcon, Bolt as BoltIcon } from '@mui/icons-material';
import { api } from '../config/api';
import { updateLoading } from '../features/themeSlice';
import { setNotification } from '../features/notificationSlice';
import { useForm } from 'react-hook-form';
import { FormSelesai, FormStatus } from '../components/pages/sedangDikerjakan';
import columnAntrian from '../components/columnAntrian';
import columnHistory from '../components/columnHistory';
import DetailAntrian from '../components/DetailAntrian';
import FormPesan from '../components/pages/sedangDikerjakan/FormPesan';
import { checkColor } from '../components/controls';

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
const SedangDikerjakan = (props) => {
    const { socket } = props;
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { control, register, reset, handleSubmit, setError, formState: { errors }, watch, setValue } = useForm({ defaultValues: { checked: false } });

    const [detailID, setDetailID] = React.useState(null);
    const [keterangan, setKeterangan] = React.useState({
        id: null,
        keterangan: null,
    });

    const [status, setStatus] = React.useState({
        id: null,
        status: null,
        keterangan: null,
    });

    // DATAGRID COLUMN IN PROGRESS
    const columnsInProgress = columnAntrian.map((e) => {
        if (e.field === 'status') {
            if (user) {
                if (user.role === 'desainer') {
                    return {
                        ...e,
                        filterable: false,
                        renderCell: (params) => {
                            return (
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Chip label={params.value} sx={{ backgroundColor: checkColor(params.value), color: 'white' }} variant="filled" />
                                    <IconButton aria-label="delete" onClick={(e) => setKeterangan({ id: params.row.id, keterangan: params.row.keterangan_desainer })}>
                                        <MessageIcon />
                                    </IconButton>
                                </Grid>
                            );
                        }
                    }
                }
                if (user.role === 'admin_produksi') {
                    return {
                        ...e,
                        filterable: true,
                        valueOptions: ['Print', 'Press', 'Jahit', 'Pending', 'Finishing'],
                        renderCell: (params) => {
                            return (
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Chip label={params.value} sx={{ backgroundColor: checkColor(params.value), color: 'white' }} variant="filled" />
                                    <IconButton aria-label="delete" onClick={(e) => setKeterangan({ id: params.row.id, keterangan: params.row.keterangan_produksi })}>
                                        <MessageIcon />
                                    </IconButton>
                                </Grid>
                            );
                        }
                    }
                }
            }
        }
        if (e.field === 'actions') {
            return {
                ...e,
                getActions: (params) => {
                    if (user) {
                        if (user.role === 'desainer') {
                            return (
                                [
                                    <GridActionsCellItem
                                        icon={<DoneIcon />}
                                        label="Selesai"
                                        onClick={() => setModal({ id: params.id, jenis: 'desainer', title: `Selesai Desain ${params.row.nota} ?`, catatan: params.row.keterangan_desainer })}
                                        color='success'
                                        size='large'
                                        showInMenu
                                    />,
                                    <GridActionsCellItem
                                        color='info'
                                        icon={<InfoIcon fontSize='large' />}
                                        label="Detail"
                                        onClick={() => setDetailID(params.id)}
                                        size='large'
                                        showInMenu
                                    />,
                                ]
                            );
                        }
                        if (user.role === 'admin_produksi') {
                            return ([
                                <GridActionsCellItem
                                    icon={<BoltIcon fontSize='large' />}
                                    label="Status"
                                    onClick={() => {
                                        setStatus({ id: params.row.id, status: params.row.status, keterangan: params.row.keterangan_produksi })
                                    }}
                                    color="success"
                                    size='large'
                                />,
                                <GridActionsCellItem
                                    icon={<DoneIcon />}
                                    label="Selesai"
                                    onClick={() => setModal({ id: params.id, jenis: 'produksi', title: `Selesai Produksi ${params.row.nota} ?`, catatan: params.row.keterangan_produksi })}
                                    color='success'
                                    size='large'
                                    showInMenu
                                />,
                                <GridActionsCellItem
                                    color='info'
                                    icon={<InfoIcon />}
                                    label="Detail"
                                    onClick={() => setDetailID(params.id)}
                                    size='large'
                                    showInMenu
                                />,
                            ]);
                        }
                    } else {
                        return ([]);
                    }

                },
            }
        }
        return e;
    });
    const columnsHistory = columnHistory.map((e) => {
        if (e.field === 'status') {
            return {
                ...e,
                valueOptions: user && user.role === 'admin_produksi' ? ['Print', 'Press', 'Jahit', 'Pending', 'Finishing', 'Selesai Produksi', 'Done'] : ['Selesai Desain', 'Print', 'Press', 'Jahit', 'Pending', 'Finishing', 'Selesai Produksi', 'Done']
            }
        }
        if (e.field === 'actions') {
            return {
                ...e, getActions: (params) => {
                    return ([
                        <GridActionsCellItem
                            icon={<InfoIcon />}
                            label="Detail"
                            onClick={() => setDetailID(params.id)}
                        />,
                    ]);
                },
            }
        }
        return e;
    });

    // INITIAL PAGE IN PROGRESS
    const load = JSON.parse(localStorage.getItem('sedang_dikerjakan'));
    const [pageState, setPageState] = React.useState({
        endpoint: 'sedang_dikerjakan',
        halaman: 'sedang_dikerjakan',
        loading: true,
        data: [],
        total: 0,
        page: load ? load.page : 1,
        pageSize: load ? load.pageSize : 10,
        totalPage: 0,
        sortModel: [{
            field: load ? load.sort_field : 'tanggal_masuk',
            sort: load ? load.sort_direction : 'desc'
        }],
        filter: {
            field: '',
            value: ''
        },
        search: '',
        visibility: load && load.visibility ? load.visibility : {
            actions: true,
            alamat: false,
            desainer: true,
            jenisorder: true,
            nama: true,
            nominal: false,
            nota: true,
            produksi: true,
            qty: true,
            sourceorder: true,
            status: true,
            tanggal_masuk: true,
        }
    });

    // INITIAL PAGE HISTORY
    const load2 = JSON.parse(localStorage.getItem('sedang_dikerjakan_history'));
    const [pageHistoryState, setPageHistoryState] = React.useState({
        endpoint: 'sedang_dikerjakan/history',
        halaman: 'sedang_dikerjakan_history',
        loading: true,
        data: [],
        total: 0,
        page: load2 ? load2.page : 1,
        pageSize: load2 ? load2.pageSize : 10,
        totalPage: 0,
        sortModel: [{
            field: load2 ? load2.sort_field : 'tanggal_masuk',
            sort: load2 ? load2.sort_direction : 'desc'
        }],
        filter: {
            field: '',
            value: ''
        },
        search: '',
        visibility: load2 && load2.visibility ? load2.visibility : {
            actions: true,
            alamat: false,
            desainer: true,
            jenisorder: true,
            nama: true,
            nominal: false,
            nota: true,
            produksi: true,
            qty: true,
            sourceorder: true,
            status: true,
            tanggal_masuk: true,
        }
    });

    // DEFAULT VISIBILITY
    React.useEffect(() => {
        if (load) {
            if (!load.visibility) {
                localStorage.setItem(pageState.halaman, JSON.stringify({ ...load, visibility: pageState.visibility }))
            }
        }
        if (load2) {
            if (!load2.visibility) {
                localStorage.setItem(pageHistoryState.halaman, JSON.stringify({ ...load2, visibility: pageHistoryState.visibility }))
            }
        }
    })

    // TAB CONFIGURATION
    const [tab, setTab] = React.useState(0);

    // GET DATA IN PROGRESS
    React.useEffect(() => {
        getData({
            endpoint: pageState.endpoint,
            pageSize: pageState.pageSize,
            page: pageState.page,
            sortModel: pageState.sortModel,
            halaman: pageState.halaman,
            search: pageState.search,
            filter: pageState.filter,
            setPageState,
            dispatch
        });
    }, [
        dispatch,
        pageState.endpoint,
        pageState.pageSize,
        pageState.page,
        pageState.sortModel,
        pageState.halaman,
        pageState.search,
        pageState.filter
    ]);

    // GET DATA HISTORY
    React.useEffect(() => {
        getData({
            endpoint: pageHistoryState.endpoint,
            pageSize: pageHistoryState.pageSize,
            page: pageHistoryState.page,
            sortModel: pageHistoryState.sortModel,
            halaman: pageHistoryState.halaman,
            search: pageHistoryState.search,
            filter: pageHistoryState.filter,
            setPageState: setPageHistoryState,
            dispatch
        });
    }, [
        dispatch,
        pageHistoryState.endpoint,
        pageHistoryState.pageSize,
        pageHistoryState.page,
        pageHistoryState.sortModel,
        pageHistoryState.halaman,
        pageHistoryState.search,
        pageHistoryState.filter
    ]);

    // CHANGE TITLE PAGE
    React.useEffect(() => {
        document.title = `${process.env.REACT_APP_SITE_TITLE} | Sedang Dikerjakan`;
    })

    // INITIAL MODAL
    const [modal, setModal] = React.useState({
        id: null,
        jenis: null,
        title: null,
        catatan: null,
    });

    // CLOSE MODAL
    const handleClose = () => {
        reset();
        setModal({
            id: null,
            jenis: null,
            title: null,
            catatan: null,
        });
    };

    // SUBMIT SELESAI
    const handleSelesai = async (value) => {
        if (!value.checked) {
            setError("checked", { type: "focus", message: 'Check untuk memastikan!' }, { shouldFocus: true });
        }
        if (value.checked) {
            const data = value;
            if (modal.jenis !== 'desainer') {
                const nominal = data.nominal_reject;
                if (nominal) {
                    data.nominal_reject = parseFloat(nominal.split("Rp. ")[1].trim().replace(/,(?=\d{3})/g, ''));
                }
            }
            dispatch(updateLoading(true));
            await api().put(`/api/sedang_dikerjakan/${modal.id}`, data).then((e) => {
                if (modal.jenis === 'desainer') {
                    socket.emit('sedang_dikerjakan')
                    socket.emit('antrian')
                } else {
                    socket.emit('sedang_dikerjakan')
                    socket.emit('antrian')
                    socket.emit('checkout')

                }
                setModal({
                    id: null,
                    jenis: null,
                    title: null,
                    catatan: null,
                });
                dispatch(
                    setNotification(
                        {
                            snackbarOpen: true,
                            snackbarType: "success",
                            snackbarMessage: "Antrian Berhasil diselesaikan!"
                        }
                    ));
                getData({ endpoint: pageState.endpoint, pageSize: pageState.pageSize, page: pageState.page, sortModel: pageState.sortModel, halaman: pageState.halaman, search: pageState.search, setPageState, dispatch });
                getData({ endpoint: pageHistoryState.endpoint, pageSize: pageHistoryState.pageSize, page: pageHistoryState.page, sortModel: pageHistoryState.sortModel, halaman: pageHistoryState.halaman, search: pageHistoryState.search, setPageState: setPageHistoryState, dispatch });
                reset();
            }).catch((e) => {
                dispatch(
                    setNotification(
                        {
                            snackbarOpen: true,
                            snackbarType: "error",
                            snackbarMessage: "Antrian Gagal diselesaikan!"
                        }
                    ))
            })
        }
    }

    const handlePesan = async (e) => {
        dispatch(updateLoading(true));
        await api().put(`/api/sedang_dikerjakan/keterangan/${keterangan.id}`, e).then((e) => {
            setKeterangan({
                id: null,
                keterangan: null
            });
            dispatch(
                setNotification(
                    {
                        snackbarOpen: true,
                        snackbarType: "success",
                        snackbarMessage: "Keterangan Berhasil di perbaharui!"
                    }
                ));
            getData({ endpoint: pageState.endpoint, pageSize: pageState.pageSize, page: pageState.page, sortModel: pageState.sortModel, halaman: pageState.halaman, search: pageState.search, setPageState, dispatch });
            dispatch(updateLoading(false));
        }).catch((e) => {
            dispatch(
                setNotification(
                    {
                        snackbarOpen: true,
                        snackbarType: "error",
                        snackbarMessage: "Keterangan Gagal di perbaharui!"
                    }
                ))
            dispatch(updateLoading(false));
        })
    }

    const handleStatus = async (e) => {
        dispatch(updateLoading(true));
        await api().put(`/api/sedang_dikerjakan/status/${status.id}`, e).then((e) => {
            socket.emit('antrian')
            socket.emit('sedang_dikerjakan')
            setStatus({
                id: null,
                status: null,
                keterangan: null
            });
            dispatch(
                setNotification(
                    {
                        snackbarOpen: true,
                        snackbarType: "success",
                        snackbarMessage: "Status Berhasil di perbaharui!"
                    }
                ));
            getData({ endpoint: pageState.endpoint, pageSize: pageState.pageSize, page: pageState.page, sortModel: pageState.sortModel, halaman: pageState.halaman, search: pageState.search, setPageState, dispatch });
            dispatch(updateLoading(false));
        }).catch((e) => {
            dispatch(
                setNotification(
                    {
                        snackbarOpen: true,
                        snackbarType: "error",
                        snackbarMessage: "Status Gagal di perbaharui!"
                    }
                ))
            dispatch(updateLoading(false));
        })
    }
    return (
        <Layout>
            {/* Title Container */}
            <Stack
                sx={{ pb: 3 }}
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Typography sx={{ fontWeight: 600 }}>Sedang Dikerjakan</Typography>
                {/* <Button variant='outlined' onClick={(e) => getInProgress({ pageSize: pageState.pageSize, page: pageState.page, sortModel: pageState.sortModel, halaman: pageState.halaman, search: pageState.search, setPageState })}>Button</Button> */}
            </Stack>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={tab} onChange={(event, value) => setTab(value)} centered>
                    <Tab {...a11yProps(0)} label="In Progress" />
                    <Tab {...a11yProps(1)} label="History" />
                </Tabs>
            </Box>

            {/* Content */}
            <TabPanel value={tab} index={0}>
                <Data columns={columnsInProgress} {...{ pageState, setPageState }} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <Data columns={columnsHistory} {...{ pageState: pageHistoryState, setPageState: setPageHistoryState }} />
            </TabPanel>

            {/* Modal Selesai */}
            <FormSelesai {...{
                control,
                register,
                handleSubmit,
                errors,
                watch,
                handleClose,
                handleSelesai,
                modal,
                setValue,
            }} />

            {/* Modal Status */}
            <FormStatus {...{ status, setStatus, handleStatus }} />

            {/* Modal Pesan */}
            <FormPesan {...{ keterangan, setKeterangan, handlePesan }} />

            <DetailAntrian {...{ detailID, setDetailID }} />
        </Layout>
    );
}

export default SedangDikerjakan;