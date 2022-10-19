import * as React from 'react';
import { Typography, Stack, Avatar, Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import Layout from '../layout/Layout';
import { AddButton } from '../components/controls';
import { useDispatch } from 'react-redux';
import { updateLoading } from '../features/themeSlice';
import { setNotification } from '../features/notificationSlice';


const columns = [
    {
        field: 'nota',
        headerName: 'No. Nota',
        flex: 1
    },
    {
        field: 'nama',
        headerName: 'Nama',
        editable: true,
        flex: 1
    },
    {
        field: 'source',
        headerName: 'Source',
        editable: true,
        flex: 1
    },
    {
        field: 'create_at',
        headerName: 'Tgl. Masuk',
        editable: true,
        flex: 1
    },
    {
        field: 'status',
        headerName: 'Status',
        editable: true,
        flex: 1
    },
    {
        field: 'jenis',
        headerName: 'Jenis',
        editable: true,
        flex: 1
    },
    {
        field: 'qty',
        headerName: 'Qty',
        type: 'number',
        editable: true,
        flex: 1
    },
    {
        field: 'desainer',
        headerName: 'Desainer',
        editable: false,
        renderCell: (params) => {
            return (
                <>
                    <Avatar src={params.value} />
                </>
            );
        },
        flex: 1
    },
    {
        field: 'produksi',
        headerName: 'Produksi',
        editable: false,
        renderCell: (params) => {
            return (
                <>
                    <Avatar src={params.value} />
                </>
            );
        },
        flex: 1
    },
];

const rows = [
    { id: 1, nota: 11, source: 'Shopee', nama: 'Snow', status: 'Baru Masuk', create_at: '20-02-2022', jenis: 'Jersey', qty: 999, desainer: 'avatar', produksi: 'avatar' },
    { id: 2, nota: 22, source: 'Offline', nama: 'Lannister', status: 'Baru Masuk', create_at: '20-02-2022', jenis: 'Jersey', qty: 999, desainer: 'avatar', produksi: 'avatar' },
    { id: 3, nota: 33, source: 'Shopee', nama: 'Lannister', status: 'Baru Masuk', create_at: '20-02-2022', jenis: 'Jersey', qty: 999, desainer: 'avatar', produksi: 'avatar' },
    { id: 4, nota: 44, source: 'Reseller', nama: 'Stark', status: 'Desain', create_at: '20-02-2022', jenis: 'Jersey', qty: 999, desainer: 'avatar', produksi: 'avatar' },
    { id: 5, nota: 55, source: 'Shopee', nama: 'Targaryen', status: 'Desain', create_at: '20-02-2022', jenis: 'Jersey', qty: 999, desainer: 'avatar', produksi: 'avatar' },
    { id: 6, nota: 66, source: 'Shopee', nama: 'Melisandre', status: 'Jahit', create_at: '20-02-2022', jenis: 'Jersey', qty: 999, desainer: 'avatar', produksi: 'avatar' },
    { id: 7, nota: 77, source: 'Offline', nama: 'Clifford', status: 'Baru Masuk', create_at: '20-02-2022', jenis: 'Jersey', qty: 999, desainer: 'avatar', produksi: 'avatar' },
    { id: 8, nota: 88, source: 'Shopee', nama: 'Frances', status: 'Finishing', create_at: '20-02-2022', jenis: 'Jersey', qty: 999, desainer: 'avatar', produksi: 'avatar' },
    { id: 9, nota: 99, source: 'Reseller', nama: 'Roxie', status: 'Finishing', create_at: '20-02-2022', jenis: 'Jersey', qty: 999, desainer: 'avatar', produksi: 'avatar' },
];

const Antrian = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(updateLoading(true));
        document.title = `${process.env.REACT_APP_SITE_TITLE} | Antrian`;
    }, [dispatch]);

    React.useEffect(() => {
        setTimeout(() => {
            dispatch(updateLoading(false))
        }, 300);
    }, [dispatch]);

    const notifYoi = () => {
        // dispatch(updateNotification(true))
        dispatch(
            setNotification(
                {
                    snackbarOpen:true,
                    snackbarType:"error",
                    snackbarMessage:"Sorry, we're not hiring marketers at this time!"
                }
            ));
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
                <AddButton title='Antrian' />
            </Stack>
            <Button onClick={notifYoi}>button</Button>

            {/* Content */}

            <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
            />

        </Layout>
    );
}

export default Antrian;