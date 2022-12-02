import * as React from 'react';
import { Typography, Stack } from "@mui/material";
import Layout from '../layout/Layout';
import { ActionButton } from '../components/controls';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoading } from '../features/themeSlice';
import { setNotification } from '../features/notificationSlice';
import { Data, Modal } from '../components/Layout/Content';
import { useForm } from 'react-hook-form';
import { create_data, update_data } from '../config/api';
import { FormAntrian } from '../components/pages/antrian';
import { api } from '../config/api';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Delete as DeleteIcon, Edit as EditIcon, Info as InfoIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import getData from '../components/getData';
import columnRekap from '../components/columnRekap';
import DetailAntrian from '../components/DetailAntrian';

const Rekap = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { control, register, watch, clearErrors, setValue, handleSubmit, reset } = useForm();

    const [jenisOrder, setJenisOrder] = React.useState({});
    const [sourceOrder, setSourceOrder] = React.useState({});
    const [detailID, setDetailID] = React.useState(null);

    React.useEffect(() => {
        const getFormRequire = async () => {
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
    // COLUMN AND DATA DEFINITION
    const load = JSON.parse(localStorage.getItem('rekap'));
    const [pageState, setPageState] = React.useState({
        endpoint: 'rekap',
        halaman: 'rekap',
        loading: true,
        data: [],
        total: 0,
        page: load ? load.page : 1,
        pageSize: load ? load.pageSize : 10,
        totalPage: 0,
        sortModel: [{
            field: load ? load.sort_field : 'tanggal_keluar',
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
            tanggal_masuk: true,
            tanggal_keluar: true,
        }
    });

    // DEFAULT VISIBILITY
    React.useEffect(() => {
        if (load) {
            if (!load.visibility) {
                localStorage.setItem(pageState.halaman, JSON.stringify({ ...load, visibility: pageState.visibility }))
            }
        }
    })

    const columns = columnRekap.map((e) => {
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
                        if (user.role === 'customer_service' || user.role === 'owner') {
                            return ([
                                <GridActionsCellItem
                                    icon={<InfoIcon />}
                                    label="Detail"
                                    onClick={() => setDetailID(params.id)}
                                    showInMenu
                                />
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
    React.useEffect(() => {
        if (user) {
            if (user.role === 'admin_produksi' || user.role === 'desainer') {
                navigate('/dashboard', { replace: true });
            }
        }
    }, [user, navigate])
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
    }, [dispatch, pageState.endpoint, pageState.pageSize, pageState.page, pageState.sortModel, pageState.halaman, pageState.search, pageState.filter]);

    React.useEffect(() => {
        document.title = `${process.env.REACT_APP_SITE_TITLE} | Rekap`;
    })

    // MODAL
    const [modal, setModal] = React.useState({
        id: null,
        jenis: null,
        title: null,
    });

    const handleEdit = (id) => {
        setModal({
            id: id,
            jenis: 'edit',
            title: 'Edit Antrian'
        });
    }
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

    // INPUT
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
                    getData({ endpoint: pageState.endpoint, pageSize: pageState.pageSize, page: pageState.page, sortModel: pageState.sortModel, halaman: pageState.halaman, search: pageState.search, setPageState, dispatch });
                    reset();
                    handleClose();
                }).catch((e) => {
                    console.log(e)
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
                    getData({ endpoint: pageState.endpoint, pageSize: pageState.pageSize, page: pageState.page, sortModel: pageState.sortModel, halaman: pageState.halaman, search: pageState.search, setPageState, dispatch });
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

    return (
        <Layout>
            {/* Title Container */}
            <Stack
                sx={{ pb: 3 }}
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Typography sx={{ fontWeight: 600 }}>Antrian</Typography>
            </Stack>

            {/* Content */}
            <Data columns={columns} {...{ pageState, setPageState }} />

            {/* Modal Create & Edit */}
            <Modal
                size="sm"
                jenis={modal.jenis}
                {...{ handleClose, handleSubmit, onSubmit, title: modal.title }}
                action={modal.jenis === 'add' ? <ActionButton color='error' title='Clear' onClick={() => reset()} /> : ''}
                form={<FormAntrian {...{ control, register, watch, clearErrors, setValue, jenisOrder, sourceOrder, id: modal.id, user }} />} />

            {/* Detail  */}
            <DetailAntrian {...{ detailID, setDetailID }} />
        </Layout>
    );
}

export default Rekap;