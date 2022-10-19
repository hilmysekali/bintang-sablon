import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useMediaQuery, CssBaseline, Box } from '@mui/material';
import { CustomAppBar } from "../components/Layout/Appbar";
import { SideBar } from "../components/Layout/Drawer";
import { Footer } from '../components/Layout/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { updateDrawer } from '../features/themeSlice';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isSmall' && prop !== 'drawerWidth' })(
    ({ theme, open, isSmall, drawerWidth }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: isSmall ? 0 : `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: isSmall ? 0 : 0,
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Layout = props => {
    const { children } = props;
    const { drawerOpen, drawerWidth } = useSelector(state => state.theme);
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();

    const setOpen = props => {
        dispatch(updateDrawer(props))
    }

    React.useEffect(() => {
        // const check = () => {
        //     var _lsTotal = 0,
        //         _xLen, _x;
        //     for (_x in localStorage) {
        //         if (!localStorage.hasOwnProperty(_x)) {
        //             continue;
        //         }
        //         _xLen = ((localStorage[_x].length + _x.length) * 2);
        //         _lsTotal += _xLen;
        //         console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
        //     };
        //     console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
        // }
        // check();
        if (isSmall) {
            dispatch(updateDrawer(false));
        } else {
            dispatch(updateDrawer(true));
        }
    }, [isSmall, dispatch]);
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* AppBar */}
            <CustomAppBar {...{ setOpen }} />

            {/* SideBar Drawer */}
            <SideBar {...{ setOpen }} />

            {/* Main Page */}
            <Main drawerWidth={drawerWidth} open={drawerOpen} isSmall={isSmall}>
                {/* Top Main Content for Breadcumbs etc */}
                <DrawerHeader />

                {/* Main Content */}
                {/* <Paper elevation={3} sx={{ padding: 3 }} > */}
                {children}
                {/* </Paper> */}

                {/* Spacing */}
                <Box sx={{ m: 10 }} />

                {/* Footer */}
                <Footer />

            </Main>

        </Box>
    );
}
export default Layout;