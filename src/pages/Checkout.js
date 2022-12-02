import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Stack, Tab, Tabs, Typography } from "@mui/material";
import Layout from '../layout/Layout';
import { useDispatch } from 'react-redux';
import { Data, Modal } from '../components/Layout/Content';
import getData from '../components/getData';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Info as InfoIcon, Done as DoneIcon } from '@mui/icons-material';
import { api } from '../config/api';
import { updateLoading } from '../features/themeSlice';
import { setNotification } from '../features/notificationSlice';
import { useForm } from 'react-hook-form';
import { FormCheckout } from '../components/pages/checkout';
import columnAntrian from '../components/columnAntrian';
import columnHistory from '../components/columnHistory';
import DetailAntrian from '../components/DetailAntrian';

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
    const { control, register, reset, handleSubmit, setError, formState: { errors }, watch } = useForm({ defaultValues: { checked: false } });

    const [antrian, setAntrian] = React.useState({});

    const [detailID, setDetailID] = React.useState(null);
    // DATAGRID COLUMN IN PROGRESS

    const columnsCheckout = columnAntrian.map((e) => {
        if (e.field === 'actions') {
            return {
                ...e,
                getActions: (params) => {
                    return ([
                        <GridActionsCellItem
                            icon={<DoneIcon />}
                            label="Selesai"
                            onClick={() => {
                                setModal({ id: params.id, title: `Checkout Antrian ${params.row.nota} ?`, jenis: 'selesai' })
                                setAntrian(params.row);
                            }}
                        />,
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

    // DATAGRID COLUMN HISTORY
    const columnsHistory = columnHistory.map((e) => {
        if (e.field === 'actions') {
            return {
                ...e,
                getActions: (params) => {
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
    const load = JSON.parse(localStorage.getItem('checkout'));
    const [pageState, setPageState] = React.useState({
        endpoint: 'checkout',
        halaman: 'checkout',
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
    const load2 = JSON.parse(localStorage.getItem('checkout_history'));
    const [pageHistoryState, setPageHistoryState] = React.useState({
        endpoint: 'checkout/history',
        halaman: 'checkout_history',
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
        document.title = `${process.env.REACT_APP_SITE_TITLE} | Checkout`;
    })

    // INITIAL MODAL
    const [modal, setModal] = React.useState({
        id: null,
        jenis: null,
        title: null,
    });

    // CLOSE MODAL
    const handleClose = () => {
        reset();
        setModal({
            id: null,
            jenis: null,
            title: null
        });
    };

    // SUBMIT SELESAI
    const onSubmit = async (value) => {
        if (!value.checked) {
            setError("checked", { type: "focus", message: 'Check untuk memastikan!' }, { shouldFocus: true });
        }
        if (value.checked) {
            const data = value;
            dispatch(updateLoading(true));
            await api().put(`/api/checkout/${modal.id}`, data).then((e) => {
                setModal({
                    id: null,
                    jenis: null,
                    title: null,
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
                dispatch(updateLoading(false));
                dispatch(
                    setNotification(
                        {
                            snackbarOpen: true,
                            snackbarType: "error",
                            snackbarMessage: e.response.data.message
                        }
                    ))
            })
        }
    }

    // WEBSOCKETS
    React.useEffect(() => {
        socket.on('onCheckoutFired', (_) => getData({
            endpoint: pageState.endpoint,
            pageSize: pageState.pageSize,
            page: pageState.page,
            sortModel: pageState.sortModel,
            halaman: pageState.halaman,
            search: pageState.search,
            filter: pageState.filter,
            setPageState,
            dispatch
        }));
    }, [socket, dispatch, pageState.endpoint, pageState.pageSize, pageState.page, pageState.sortModel, pageState.halaman, pageState.search, pageState.filter])

    return (
        <Layout>
            {/* Title Container */}
            <Button onClick={(e) => socket.emit('antrian')}>Klik</Button>
            <Button onClick={(e) => socket.emit('checkout')}>Klik</Button>
            <Stack
                sx={{ pb: 3 }}
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Typography sx={{ fontWeight: 600 }}>Checkout</Typography>
                {/* <Button variant='outlined' onClick={(e) => getInProgress({ pageSize: pageState.pageSize, page: pageState.page, sortModel: pageState.sortModel, halaman: pageState.halaman, search: pageState.search, setPageState })}>Button</Button> */}
            </Stack>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={tab} onChange={(event, value) => setTab(value)} centered>
                    <Tab {...a11yProps(0)} label="Checkout Orders" />
                    <Tab {...a11yProps(1)} label="History" />
                </Tabs>
            </Box>

            {/* Content */}
            <TabPanel value={tab} index={0}>
                <Data columns={columnsCheckout} {...{ pageState, setPageState }} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <Data columns={columnsHistory} {...{ pageState: pageHistoryState, setPageState: setPageHistoryState }} />
            </TabPanel>

            {/* Modal Selesai */}
            <Modal size="sm" jenis={modal.jenis} {...{ handleClose, handleSubmit, onSubmit, title: modal.title }} form={<FormCheckout {...{ antrian, control, register, errors, watch }} />} />

            <DetailAntrian {...{ detailID, setDetailID }} />
        </Layout>
    );
}

export default SedangDikerjakan;