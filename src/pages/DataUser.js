import * as React from 'react';
import { Typography, Stack, Avatar } from "@mui/material";
import Layout from '../layout/Layout';
import { Data, Modal } from '../components/Layout/Content';
import { ActionButton, AddButton } from '../components/controls';
import { FormUser } from '../components/pages/dataUser/FormUser';
import { useForm } from 'react-hook-form';
import { updateLoading } from '../features/themeSlice';
import { setNotification } from '../features/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { create_data } from '../config/api';
import getData from '../components/getData';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DataUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const { control, register, reset, handleSubmit, setError, formState: { errors }, setValue } = useForm();
    const [preview, setPreview] = React.useState();

    React.useEffect(() => {
        if (user) {
            if (user.role !== 'root') {
                if (user.role === 'customer_service') {
                    navigate('/dashboard', { replace: true });
                }
                if (user.role === 'desainer') {
                    navigate('/antrian', { replace: true });
                }
                if (user.role === 'admin_produksi') {
                    navigate('/antrian', { replace: true });
                }
                if (user.role === 'owner') {
                    navigate('/dashboard', { replace: true });
                }
            }
        }
    }, [user, navigate])

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 1,
            hide: true,
            hideable: false,
        },
        {
            field: 'usercode',
            flex: 1,
            hideable: false,
            renderHeader: () => (
                <strong>
                    Kode User
                </strong>
            ),
        },
        {
            field: 'role',
            flex: 1,
            renderHeader: () => (
                <strong>
                    Role
                </strong>
            ),
            renderCell: (params) => {
                return (
                    <Typography sx={{ textTransform: 'capitalize' }}>{params.value.split('_').join(' ')}</Typography>
                );
            },
        },
        {
            field: 'name',
            flex: 1,
            renderHeader: () => (
                <strong>
                    Nama
                </strong>
            ),
            renderCell: (params) => {
                return (
                    <>
                        <Avatar src={params.row.photo ? `http://localhost:8000/images/photos/${params.row.photo}` : ''} sx={{ mr: 1 }} />
                        <Typography>{params.row.name}</Typography>
                    </>
                );
            },
        },
        {
            field: 'username',
            flex: 1,
            renderHeader: (props) => (
                <strong>
                    Username
                </strong>
            ),
        },
        {
            hideable: false,
            headerName: 'Aksi',
            renderHeader: () => (<strong>Aksi</strong>),
            disableClickEventBubbling: true,
            field: 'actions',
            type: 'actions',
            width: 100,
            getActions: (params) => {
                let disabled = false;
                if (params.row.role === 'root') {
                    disabled = true;
                } else {
                    disabled = false;
                }
                return ([
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={() => handleEdit(params.id)}
                        color="warning"
                        disabled={disabled}
                        showInMenu
                    />,
                ]);
            }
        }
    ];

    const onSubmit = (values) => {
        dispatch(updateLoading(true));
        const data = values;
        if (data.photo.length > 0) {
            data.photo = values.photo[0];
        } else {
            data.photo = null;
        }
        const header = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        create_data({ endpoint: 'user', values: data, rest: header }).then((e) => {
            dispatch(updateLoading(false));
            dispatch(
                setNotification(
                    {
                        snackbarOpen: true,
                        snackbarType: "success",
                        snackbarMessage: "User Berhasil ditambah!"
                    }
                ));
            setPreview(undefined);
            reset();
            handleClose();
            getData({ endpoint: pageState.endpoint, pageSize: pageState.pageSize, page: pageState.page, sortModel: pageState.sortModel, halaman: pageState.halaman, search: pageState.search, setPageState, dispatch });
        }).catch((e) => {
            const errors = e.response.data.errors;
            if (errors.username) {
                setError('username', {
                    type: "server",
                    message: errors.username,
                });
            }
            if (errors.usercode) {
                setError('usercode', {
                    type: "server",
                    message: errors.usercode,
                });
            }
            if (errors.photo) {
                setError('photo', {
                    type: "server",
                    message: errors.photo,
                });
            }

            dispatch(updateLoading(false));
            dispatch(
                setNotification(
                    {
                        snackbarOpen: true,
                        snackbarType: "error",
                        snackbarMessage: "Gagal! Silhakan Cek Inputan anda!"
                    }
                ));
        });
    };
    const load = JSON.parse(localStorage.getItem('data_user'));
    const [pageState, setPageState] = React.useState({
        endpoint: 'user',
        halaman: 'data_user',
        loading: true,
        data: [],
        total: 0,
        page: load ? load.page : 1,
        pageSize: load ? load.pageSize : 10,
        totalPage: 0,
        sortModel: [{
            field: load ? load.sort_field : 'id',
            sort: load ? load.sort_direction : 'desc'
        }],
        filter: {
            field: '',
            value: ''
        },
        search: '',
        visibility: load && load.visibility ? load.visibility : {
            id: false,
            usercode: true,
            role: true,
            name: true,
            username: true,
            actions: true,
        }
    });

    // CRUD OPERATION

    const [modal, setModal] = React.useState({
        id: null,
        jenis: null,
        title: null
    });
    const handleAdd = () => {
        setModal({
            id: null,
            jenis: 'add',
            title: 'Tambah Data User'
        });
    };

    const handleEdit = (id) => {
        setModal({
            id: id,
            jenis: 'edit',
            title: 'Edit User'
        });
    };

    const handleClose = () => {
        if (modal.id) {
            reset()
            setPreview(undefined)
        }
        setModal({
            id: null,
            jenis: null,
            title: null
        });
    };

    const handleClear = () => {
        reset()
        setPreview(undefined)
    }

    React.useEffect(() => {
        document.title = `${process.env.REACT_APP_SITE_TITLE} | Data User`;
    });

    React.useEffect(() => {
        getData({ endpoint: pageState.endpoint, pageSize: pageState.pageSize, page: pageState.page, sortModel: pageState.sortModel, halaman: pageState.halaman, search: pageState.search, setPageState, dispatch });
    }, [dispatch, pageState.endpoint, pageState.pageSize, pageState.page, pageState.sortModel, pageState.halaman, pageState.search]);

    return (
        <Layout>
            {/* Title Container */}
            <Stack
                sx={{ pb: 3 }}
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Typography sx={{ fontWeight: 600 }}>Data User</Typography>
                <AddButton title='Data User' onClick={handleAdd} />
            </Stack>

            {/* Content */}
            <Data columns={columns} {...{ pageState, setPageState }} />

            {/* Modal Create & Edit */}
            <Modal
                size="xs"
                action={
                    modal.jenis === 'add'
                        ? <ActionButton onClick={handleClear} title={'Clear'} color={'error'} />
                        : modal.jenis === 'edit'
                            ? <ActionButton onClick={handleClose} title={'Batal'} color={'error'} />
                            : ''}
                jenis={modal.jenis}
                title={modal.title}
                {...{ handleClose, handleSubmit, onSubmit }}
                form={<FormUser {...{ control, register, preview, setPreview, errors, setValue, id: modal.id, jenis: modal.jenis, setModal }} />} />
        </Layout>
    );
}

export default DataUser;