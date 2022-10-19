import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Stack, Avatar } from "@mui/material";
import Layout from '../layout/Layout';
import { Data, Modal } from '../components/Layout/Content';
import { AddButton } from '../components/controls';
import FormUser from '../components/pages/dataUser/FormUser';


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
        renderCell: (params) => {
            return (
                <>
                    <Avatar src={params.value} sx={{ mr: 1 }} />
                    <Typography>{params.value}</Typography>
                </>
            );
        },
        flex: 1,
        renderHeader: () => (
            <strong>
                Role
            </strong>
        ),
    },
    {
        field: 'name',
        flex: 1,
        renderHeader: () => (
            <strong>
                Nama
            </strong>
        ),
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
    // {
    //     field: 'status',
    //     headerName: 'Status',
    //     flex: 1,
    //     renderCell: (params) => {
    //         return (
    //             <FormGroup>
    //                 <FormControlLabel disabled control={<Switch defaultChecked={params.value} />} label={params.value ? 'Aktif' : 'Tidak Aktif'} />
    //             </FormGroup>

    //         );
    //     }
    // },
];

const DataUser = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        document.title = `${process.env.REACT_APP_SITE_TITLE} | Data User`;
    }, [dispatch]);

    const [modal, setModal] = React.useState({
        isActive: false,
        jenis: '',
        title: ''
    });

    const handleAdd = () => {
        setModal({
            isActive: true,
            jenis: 'add',
            title: 'Tambah Data User'
        });
    };
    const handleClose = () => {
        setModal({
            isActive: false,
            jenis: '',
            title: ''
        });
    };
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
            <Data endpoint="all_user" columns={columns} halaman={'data_user'} />

            {/* Modal Create & Edit */}
            <Modal size="sm" {...{ modal, handleClose }}>
                <FormUser />
            </Modal>
        </Layout>
    );
}

export default DataUser;