import {
    Speed as SpeedIcon,
    FormatListNumbered as FormatListNumberedIcon,
    Verified as VerifiedIcon,
    Money as MoneyIcon,
    ReceiptLong as ReceiptLongIcon,
    EmojiEvents as EmojiEventsIcon,
    Skateboarding as SkateboardingIcon,
    Tune as TuneIcon,
    Groups as GroupsIcon
} from '@mui/icons-material';
/*===================================== */
/*
 Root Routes
 List :
    - Data User
    - Antrian
    - Rekap
 */
const root_router = [
    {
        icon: <GroupsIcon />,
        label: 'Data User',
        path: '/data_user',
    },
    {
        icon: <FormatListNumberedIcon />,
        label: 'Antrian',
        path: '/antrian',
    },
    {
        icon: <ReceiptLongIcon />,
        label: 'Rekap',
        path: '/rekap',
    },
];
/*===================================== */
/*
 Customer Service
 List :
    - Dashboard
    - Antrian
    - Checkout
    - Pendapatan
    - Rekap
 */
const customer_service_router = [
    {
        icon: <SpeedIcon />,
        label: 'Dashboard',
        path: '/dashboard',
    },
    {
        icon: <FormatListNumberedIcon />,
        label: 'Antrian',
        path: '/antrian',
    },
    {
        icon: <VerifiedIcon />,
        label: 'Checkout',
        path: '/checkout',
    },
    {
        icon: <MoneyIcon />,
        label: 'Pendapatan',
        path: '/pendapatan',
    },
    {
        icon: <ReceiptLongIcon />,
        label: 'Rekap',
        path: '/rekap',
    },
];
/*===================================== */
/*
 Desainer
 List :
    - Antrian
    - Sedang Dikerjakan
    - Pencapaian
 */
const desainer_router = [
    {
        icon: <FormatListNumberedIcon />,
        label: 'Antrian',
        path: '/antrian',
    },
    {
        icon: <SkateboardingIcon />,
        label: 'Sedang Dikerjakan',
        path: '/my-project',
    },
    {
        icon: <EmojiEventsIcon />,
        label: 'Pencapaian',
        path: '/pencapaian',
    },
];
/*===================================== */
/*
 Admin Produksi
 List :
    - Antrian
    - Sedang Dikerjakan
    - Pencapaian
 */
const admin_produksi_router = [
    {
        icon: <FormatListNumberedIcon />,
        label: 'Antrian',
        path: '/antrian',
    },
    {
        icon: <SkateboardingIcon />,
        label: 'Sedang Dikerjakan',
        path: '/my-project',
    },
    {
        icon: <EmojiEventsIcon />,
        label: 'Pencapaian',
        path: '/pencapaian',
    },
];
/*===================================== */
/*
 Owner
 List :
    - Dashboard
    - Pendapatan
    - Pencapaian
    - Rekap
    - Pengaturan
 */
const owner_router = [
    {
        icon: <SpeedIcon />,
        label: 'Dashboard',
        path: '/dashboard',
    },
    {
        icon: <MoneyIcon />,
        label: 'Pendapatan',
        path: '/pendapatan',
    },
    {
        icon: <EmojiEventsIcon />,
        label: 'Pencapaian',
        path: '/pencapaian',
    },
    {
        icon: <ReceiptLongIcon />,
        label: 'Rekap',
        path: '/rekap',
    },
    {
        icon: <TuneIcon />,
        label: 'Pengaturan',
        path: '/pengaturan',
    },
];
export { root_router, customer_service_router, desainer_router, admin_produksi_router, owner_router };