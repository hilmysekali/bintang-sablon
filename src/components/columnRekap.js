import { Avatar, AvatarGroup, Chip, Tooltip, Typography } from "@mui/material";
import { checkColor, checkDate, dateFormat } from "./controls";

const columnRekap = [
    {
        field: 'nota',
        flex: 1,
        minWidth: 150,
        hideable: false,
        headerName: 'No. Nota',
        renderHeader: () => (
            <strong>
                No. Nota
            </strong>
        ),
    },
    {
        field: 'nama',
        flex: 1,
        minWidth: 150,
        headerName: 'Nama',
        renderHeader: () => (<strong>Nama</strong>),
    },
    {
        field: 'alamat',
        flex: 1,
        minWidth: 150,
        headerName: 'Alamat',
        renderHeader: () => (<strong>Alamat</strong>),
        filterable: true,
        renderCell: (params) => {
            return (
                <Tooltip title={params.value}>
                    <Typography noWrap>{params.value}</Typography>
                </Tooltip>
            )
        }
    },
    {
        field: 'sourceorder',
        type: 'singleSelect',
        renderCell: (params) => {
            return (
                <>
                    <Typography>{params.value.name}</Typography>
                </>
            );
        },
        flex: 1,
        minWidth: 150,
        headerName: 'Source',
        renderHeader: () => (<strong>Source</strong>),
    },
    {
        field: 'tanggal_masuk',
        type: 'date',
        flex: 1,
        minWidth: 150,
        renderCell: (params) => {
            return (
                <>
                    <Typography>
                        {dateFormat(params.value)}
                    </Typography>
                </>
            );
        },
        headerName: 'Tgl. Masuk',
        renderHeader: () => (<strong>Tgl. Masuk</strong>),
    },
    {
        field: 'tanggal_keluar',
        type: 'date',
        flex: 1,
        minWidth: 150,
        renderCell: (params) => {
            return (
                <>
                    <Typography>
                        {dateFormat(params.value)}
                    </Typography>
                </>
            );
        },
        headerName: 'Tgl. Keluar',
        renderHeader: () => (<strong>Tgl. Keluar</strong>),
    },
    {
        field: 'jenisorder',
        type: 'singleSelect',
        renderCell: (params) => {
            return (
                <>
                    <Typography>{params.value.name}</Typography>
                </>
            );
        },
        flex: 1,
        minWidth: 70,
        headerName: 'Jenis',
        renderHeader: () => (<strong>Jenis</strong>),
    },
    {
        field: 'qty',
        type: 'number',
        flex: 1,
        minWidth: 70,
        headerName: 'Qty',
        renderHeader: () => (<strong>Qty</strong>),
        filterable: false
    },
    {
        field: 'nominal',
        type: 'number',
        flex: 1,
        minWidth: 150,
        headerName: 'Nominal',
        renderHeader: () => (<strong>Nominal</strong>),
        filterable: false,
    },
    {
        field: 'desainer',
        renderCell: (params) => {
            const desainer = params.row.antriantake.filter((e) => e.user.role === 'desainer');

            if (desainer.length > 0) {
                return (
                    <AvatarGroup>
                        {desainer.map((e) => (
                            <Tooltip title={e.user.name} key={e.user.id}>
                                <Avatar alt={e.user.name} sx={{ bgcolor: e.user.color }} src={e.user.photo}>{e.user.name[0]}</Avatar>
                            </Tooltip>
                        ))}
                    </AvatarGroup>
                );
            } else {
                return '-';
            }
        },
        flex: 1,
        minWidth: 150,
        headerName: 'Desainer',
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        filterable: false,
        renderHeader: () => (<strong>Desainer</strong>),
    },
    {
        field: 'produksi',
        renderCell: (params) => {
            const produksi = params.row.antriantake.filter((e) => e.user.role === 'admin_produksi');

            if (produksi.length > 0) {
                return (
                    <AvatarGroup>
                        {produksi.map((e) => (
                            <Tooltip title={e.user.name} key={e.user.id}>
                                <Avatar alt={e.user.name} sx={{ bgcolor: e.user.color }} src={e.user.photo}>{e.user.name[0]}</Avatar>
                            </Tooltip>
                        ))}
                    </AvatarGroup>
                );
            } else {
                return '-';
            }
        },
        flex: 1,
        minWidth: 150,
        headerName: 'Produksi',
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        filterable: false,
        renderHeader: () => (<strong>Produksi</strong>),
    },
    {
        hideable: false,
        headerName: 'Aksi',
        renderHeader: () => (<strong>Aksi</strong>),
        disableClickEventBubbling: true,
        field: 'actions',
        type: 'actions',
        width: 100,
    }
];

export default columnRekap;