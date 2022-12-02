import * as React from 'react';
import { Typography, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider } from "@mui/material";
import Layout from '../layout/Layout';
import { ActionButton, AddButton } from '../components/controls';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoading } from '../features/themeSlice';
import { setNotification } from '../features/notificationSlice';
import { Data, Modal } from '../components/Layout/Content';
import { useForm } from 'react-hook-form';
import { create_data, update_data } from '../config/api';
import { FormAntrian } from '../components/pages/antrian'
import { api } from '../config/api';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Delete as DeleteIcon, Edit as EditIcon, Info as InfoIcon, PanTool as PanToolIcon, ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import getData from '../components/getData';
import columnAntrian from '../components/columnAntrian';
import DetailAntrian from '../components/DetailAntrian';

const Antrian = (props) => {
    const { socket } = props;
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { control, register, watch, clearErrors, setValue, handleSubmit, reset } = useForm();

    const [jenisOrder, setJenisOrder] = React.useState({});
    const [sourceOrder, setSourceOrder] = React.useState({});
    const [size, setSize] = React.useState({});
    const [additional, setAdditional] = React.useState({});

    React.useEffect(() => {
        const getFormRequire = async () => {
            await api().get('/api/size').then((e) => {
                if (e.status === 200) {
                    setSize(e.data)
                }
            })

            await api().get('/api/additional').then((e) => {
                if (e.status === 200) {
                    setAdditional(e.data)
                }
            })

            await api().get('/api/jenis_order').then((e) => {
                if (e.status === 200) {
                    setJenisOrder(e.data)
                }
            })

            await api().get('/api/source_order').then((e) => {
                if (e.status === 200) {
                    setSourceOrder(e.data)
                }
            })
        }

        getFormRequire();
    }, [])


    // CRUD OPERATION
    // DATA DEFINITION AND PAGE SETTINGS
    const load = JSON.parse(localStorage.getItem('antrian'));
    const [pageState, setPageState] = React.useState({
        endpoint: 'antrian',
        halaman: 'antrian',
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

    // COLUMN
    const columns = columnAntrian.map((e) => {
        if (e.field === 'status') {
            return {
                ...e,
                valueOptions: ['Baru Masuk', 'Desain', 'Selesai Desain', 'Print', 'Press', 'Jahit', 'Pending', 'Finishing', 'Selesai Produksi']
            }
        }
        if (e.field === 'jenisorder') {
            return {
                ...e,
                valueOptions: jenisOrder.length && jenisOrder.map((e) => e.name)
            }
        }
        if (e.field === 'sourceorder') {
            return {
                ...e,
                valueOptions: sourceOrder.length && sourceOrder.map((e) => e.name)
            }
        }
        if (e.field === 'actions') {
            return {
                ...e,
                getActions: (params) => {
                    if (user) {
                        if (user.role === 'customer_service') {
                            return ([
                                <GridActionsCellItem
                                    icon={<EditIcon />}
                                    label="Edit"
                                    onClick={() => handleEdit(params.id)}
                                    showInMenu
                                />,
                                <GridActionsCellItem
                                    icon={<InfoIcon />}
                                    label="Detail"
                                    onClick={() => setDetailID(params.id)}
                                    showInMenu
                                />
                            ]);
                        }
                        if (user.role === 'desainer') {
                            let hide = null;
                            const check = params.row.antriantake.filter(take => take.user_id === user.id);
                            if (check.length > 0 || (params.row.status !== 'Baru Masuk' && params.row.status !== 'Desain')) {
                                hide = true;
                            } else {
                                hide = false;
                            }
                            return ([
                                <GridActionsCellItem
                                    icon={<PanToolIcon />}
                                    label="Take"
                                    onClick={() => setModal({ id: params.id, jenis: 'ambil_antrian', title: 'Ambil Antrian ini?' })}
                                    color="warning"
                                    disabled={hide}
                                />,
                                <GridActionsCellItem
                                    color='info'
                                    icon={<InfoIcon />}
                                    label="Detail"
                                    onClick={() => setDetailID(params.id)}
                                />,
                            ]);
                        }
                        if (user.role === 'admin_produksi') {
                            let hide = null;
                            const check = params.row.antriantake.filter(take => take.user_id === user.id);
                            if (check.length > 0 || (params.row.status !== 'Selesai Desain')) {
                                hide = true;
                            } else {
                                hide = false;
                            }
                            return ([
                                <GridActionsCellItem
                                    icon={<PanToolIcon />}
                                    label="Take"
                                    onClick={() => setModal({ id: params.id, jenis: 'ambil_antrian', title: 'Ambil Antrian ini?' })}
                                    color="success"
                                    disabled={hide}
                                />,
                                <GridActionsCellItem
                                    icon={<InfoIcon />}
                                    label="Detail"
                                    onClick={() => setDetailID(params.id)}
                                    showInMenu
                                />,
                            ]);
                        }
                        if (user.role === 'root') {
                            return ([
                                <GridActionsCellItem
                                    icon={<EditIcon />}
                                    label="Edit"
                                    onClick={() => handleEdit(params.id)}
                                    showInMenu
                                />,
                                <GridActionsCellItem
                                    icon={<DeleteIcon />}
                                    label="Delete"
                                    onClick={() => console.log('delete', params.id)}
                                    showInMenu
                                />,
                                <GridActionsCellItem
                                    icon={<InfoIcon />}
                                    label="Detail"
                                    onClick={() => setDetailID(params.id)}
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
    })

    // WEBSOCKETS
    React.useEffect(() => {
        socket.on('onAntrianFired', (_) => getData({
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

    // USER CAN OPEN
    React.useEffect(() => {
        if (user) {
            if (user.role === 'owner') {
                navigate('/dashboard', { replace: true });
            }
        }
    }, [user, navigate])

    // DEFAULT VISIBILITY
    React.useEffect(() => {
        if (load) {
            if (!load.visibility) {
                localStorage.setItem(pageState.halaman, JSON.stringify({ ...load, visibility: pageState.visibility }))
            }
        }
    })

    // GET DATA
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
        document.title = `${process.env.REACT_APP_SITE_TITLE} | Antrian`;
    }, [dispatch, pageState.endpoint, pageState.pageSize, pageState.page, pageState.sortModel, pageState.halaman, pageState.search, pageState.filter]);


    // INITIAL MODAL
    const [modal, setModal] = React.useState({
        id: null,
        jenis: null,
        title: null,
    });

    // ADD ANTRIAN
    const handleAdd = () => {
        setModal({
            id: null,
            jenis: 'add',
            title: 'Tambah Antrian'
        });
    };

    // EDIT ANTRIAN
    const handleEdit = (id) => {
        setModal({
            id: id,
            jenis: 'edit',
            title: 'Edit Antrian'
        });
    }

    // CLOSE MODAL
    const handleClose = () => {
        if (modal.id) {
            setModal({ id: null });
            reset();
        }
        setModal({
            jenis: null,
            title: null
        });
    };

    // INPUT ANTRIAN
    const onSubmit = (values) => {
        const sizeActive = values.detail.size.filter(x => x.isActive === true);
        const additionalActive = values.detail.additional.filter(x => x.isActive === true);
        if (sizeActive.length < 1) {
            dispatch(
                setNotification(
                    {
                        snackbarOpen: true,
                        snackbarType: "error",
                        snackbarMessage: "Gagal! Detail Order Kosong!"
                    }
                ));
        } else {
            dispatch(updateLoading(true));
            const data = values;
            const newSize = sizeActive.map((x) => {
                const harga = x.harga.split("Rp. ")[1].trim().replace(/,(?=\d{3})/g, '');
                return { ...x, qty: parseInt(x.qty), harga: parseFloat(harga) }
            });
            const newAdditional = additionalActive.map((x) => {
                const harga = x.harga.split("Rp. ")[1].trim().replace(/,(?=\d{3})/g, '');
                return { ...x, qty: parseInt(x.qty), harga: parseFloat(harga) }
            });
            data.detail.size = newSize;
            data.detail.additional = newAdditional;
            if (modal.jenis === 'add') {
                create_data({ endpoint: 'antrian', values: data }).then((e) => {
                    dispatch(updateLoading(false));
                    dispatch(
                        setNotification(
                            {
                                snackbarOpen: true,
                                snackbarType: "success",
                                snackbarMessage: "Antrian Berhasil ditambah!"
                            }
                        ));
                    socket.emit('antrian')
                    reset();
                    handleClose();
                }).catch((e) => {
                    dispatch(updateLoading(false));
                    const errors = e.response.data.errors;
                    if (errors.size === 0) {
                        dispatch(
                            setNotification(
                                {
                                    snackbarOpen: true,
                                    snackbarType: "error",
                                    snackbarMessage: "Gagal! Detail Order Kosong!"
                                }
                            ));
                    }
                    if (errors.user === 'not') {
                        dispatch(
                            setNotification(
                                {
                                    snackbarOpen: true,
                                    snackbarType: "error",
                                    snackbarMessage: "Gagal! User Bukan Customer Service!"
                                }
                            ));
                    }
                    setNotification(
                        {
                            snackbarOpen: true,
                            snackbarType: "error",
                            snackbarMessage: "Antrian Gagal ditambah!"
                        }
                    )
                })
            } else {
                update_data({ endpoint: 'antrian', id: modal.id, values: data }).then((e) => {
                    dispatch(updateLoading(false));
                    dispatch(
                        setNotification(
                            {
                                snackbarOpen: true,
                                snackbarType: "success",
                                snackbarMessage: 'Antrian Berhasil di perbaharui!'
                            }
                        ));
                    socket.emit('antrian')
                    reset();
                    handleClose();
                }).catch((e) => {
                    dispatch(updateLoading(false));
                    const errors = e.response.data.errors;
                    if (errors.size === 0) {
                        dispatch(
                            setNotification(
                                {
                                    snackbarOpen: true,
                                    snackbarType: "error",
                                    snackbarMessage: "Gagal! Detail Order Kosong!"
                                }
                            ));
                    } else {
                        dispatch(
                            setNotification(
                                {
                                    snackbarOpen: true,
                                    snackbarType: "error",
                                    snackbarMessage: "Antrian Gagal di perbaharui!"
                                }
                            ));
                    }
                })
            }
        }
    }

    // TAKE ANTRIAN
    const handleTake = async (values, id = null) => {
        if (values) {
            dispatch(updateLoading(true));
            await api().put(`/api/antrian/take/${id}`).then((e) => {
                setModal({
                    id: null,
                    jenis: null,
                    title: null,
                });
                navigate('/my-project', { replace: true });
                dispatch(
                    setNotification(
                        {
                            snackbarOpen: true,
                            snackbarType: "success",
                            snackbarMessage: "Antrian Berhasil Di Ambil!"
                        }
                    ));
                socket.emit('antrian')
            }).catch((e) => {
                setNotification(
                    {
                        snackbarOpen: true,
                        snackbarType: "error",
                        snackbarMessage: "Antrian Gagal Di Ambil!"
                    }
                )
            })
        } else {
            setModal({
                id: null,
                jenis: null,
                title: null
            })
        }
    }

    const [detailID, setDetailID] = React.useState(null);

    return (
        <Layout>
            {/* Title Container */}
            <Stack
                sx={{ pb: 3 }}
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Typography sx={{ fontWeight: 600 }}>Antrian</Typography>
                {user && user.role === 'customer_service' && (
                    <AddButton title='Antrian' onClick={handleAdd} />
                )}
            </Stack>

            {/* Content */}
            <Data columns={columns} {...{ pageState, setPageState }} />

            {/* Modal Create & Edit */}
            <Modal
                size="sm"
                jenis={modal.jenis}
                {...{ handleClose, handleSubmit, onSubmit, title: modal.title }}
                action={modal.jenis === 'add' ? <ActionButton color='error' title='Clear' onClick={() => reset()} /> : ''}
                form={<FormAntrian {...{ control, register, watch, clearErrors, setValue, jenisOrder, sourceOrder, size, additional, modal: modal, user, setModal }} />} />

            {/* Dialog Take Antrian */}
            <Dialog
                maxWidth={'xs'}
                fullWidth
                open={modal.jenis === 'ambil_antrian' ? true : false}
                onClose={() => handleTake(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ alignSelf: 'center' }}>
                    {"Ambil Antrian Ini"}
                </DialogTitle>
                <DialogContent sx={{ alignSelf: 'center' }}>
                    <ErrorOutlineIcon sx={{ fontSize: 100 }} color='primary' />
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button variant='contained' color='error' onClick={() => handleTake(false)} sx={{ width: '-webkit-fill-available' }}>Batal</Button>
                    <Button variant='contained' color='primary' onClick={() => handleTake(true, modal.id)} autoFocus sx={{ width: '-webkit-fill-available' }}>
                        Selesai
                    </Button>
                </DialogActions>
            </Dialog>

            <DetailAntrian {...{ detailID, setDetailID }} />
        </Layout>
    );
}

export default Antrian;