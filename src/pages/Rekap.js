import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Stack } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import Layout from '../layout/Layout';
import { AddButton } from '../components/controls';
import { updateLoading } from '../features/themeSlice';

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
        field: 'tgl_masuk',
        headerName: 'Tgl. Masuk',
        editable: true,
        flex: 1
    },
    {
        field: 'tgl_keluar',
        headerName: 'Tgl. Keluar',
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
];

const rows = [
    { id: 1, nota: 11, source: 'Shopee', nama: 'Snow', tgl_masuk: '20-02-2022', tgl_keluar: '20-02-2022', jenis: 'Jersey', qty: 999 },
    { id: 2, nota: 22, source: 'Offline', nama: 'Lannister', tgl_masuk: '20-02-2022', tgl_keluar: '20-02-2022', jenis: 'Jersey', qty: 999 },
    { id: 3, nota: 33, source: 'Shopee', nama: 'Lannister', tgl_masuk: '20-02-2022', tgl_keluar: '20-02-2022', jenis: 'Jersey', qty: 999 },
    { id: 4, nota: 44, source: 'Reseller', nama: 'Stark', tgl_masuk: '20-02-2022', tgl_keluar: '20-02-2022', jenis: 'Jersey', qty: 999 },
    { id: 5, nota: 55, source: 'Shopee', nama: 'Targaryen', tgl_masuk: '20-02-2022', tgl_keluar: '20-02-2022', jenis: 'Jersey', qty: 999 },
    { id: 6, nota: 66, source: 'Shopee', nama: 'Melisandre', tgl_masuk: '20-02-2022', tgl_keluar: '20-02-2022', jenis: 'Jersey', qty: 999 },
    { id: 7, nota: 77, source: 'Offline', nama: 'Clifford', tgl_masuk: '20-02-2022', tgl_keluar: '20-02-2022', jenis: 'Jersey', qty: 999 },
    { id: 8, nota: 88, source: 'Shopee', nama: 'Frances', tgl_masuk: '20-02-2022', tgl_keluar: '20-02-2022', jenis: 'Jersey', qty: 999 },
    { id: 9, nota: 99, source: 'Reseller', nama: 'Roxie', tgl_masuk: '20-02-2022', tgl_keluar: '20-02-2022', jenis: 'Jersey', qty: 999 },
];

const Rekap = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(updateLoading(true));
        document.title = `${process.env.REACT_APP_SITE_TITLE} | Rekap`;
      }, [dispatch]);

    React.useEffect(() => {
        setTimeout(() => {
            dispatch(updateLoading(false));
        }, 300);
    }, [dispatch]);
    return (
        <Layout>
            {/* Title Container */}
            <Stack
                sx={{ pb: 3 }}
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Typography sx={{ fontWeight: 600 }}>Rekap</Typography>
                <AddButton title='Rekap'/>
            </Stack>

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

export default Rekap;