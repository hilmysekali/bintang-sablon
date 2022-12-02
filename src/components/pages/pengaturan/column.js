import { Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";
import bulan from "../../../config/bulan";

const column = [
    {
        field: 'bulan',
        flex: 1,
        minWidth: 150,
        hideable: false,
        headerName: 'Bulan',
        renderHeader: () => (<strong>Bulan</strong>),
        renderCell: (params) => {
            return (
                <Typography>{bulan[params.value - 1]}</Typography>
            )
        }
    },
    {
        field: 'tahun',
        flex: 1,
        minWidth: 150,
        hideable: false,
        headerName: 'Tahun',
        renderHeader: () => (<strong>Tahun</strong>),
    },
    {
        field: 'jumlah',
        flex: 1,
        minWidth: 150,
        hideable: false,
        headerName: 'Target',
        renderHeader: () => (<strong>Target</strong>),
        renderCell: (params) => {
            return (
                <>
                    <NumericFormat
                        value={params.value}
                        thousandSeparator
                        prefix='Rp. '
                        displayType="text" />
                </>
            );
        },
    },
    {
        hideable: false,
        headerName: 'Aksi',
        renderHeader: () => (<strong>Aksi</strong>),
        field: 'actions',
        type: 'actions',
        width: 100,
    }
]

export default column;