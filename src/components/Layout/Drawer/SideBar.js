import * as React from 'react';
import {
    styled,
    Drawer,
    Toolbar,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    useTheme,
    useMediaQuery,
    Skeleton
} from '@mui/material';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Stack } from '@mui/system';

const CustomListItem = styled(ListItem)(() => ({
    padding: "0",
}));

const CustomLinkStyle = styled(NavLink)(({ theme }) => ({
    width: "100%",
    padding: "8px 8px 8px 32px",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: 'grey',
    "& .MuiListItemIcon-root": {
        minWidth: "auto",
        marginRight: theme.spacing(2),
        color: "inherit",
        fontSize: 18,
    },
    "& h6": {
        fontSize: 15,
        fontWeight: 400,
    },
}));

const SideBar = ({ setOpen }) => {
    const { drawerOpen, drawerWidth } = useSelector(state => state.theme);
    const { menuList } = useSelector(state => state.auth);
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const setSidebar = (props) => {
        if (props) {
            setTimeout(() => {
                setOpen(false)
            }, 1000)
        }
    }

    const handleClose = (e) => {
        setOpen(false)
    }

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    backgroundColor: '#e3eaf1',
                    borderRightColor: '#e3eaf1',
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant={isSmall ? "temporary" : "persistent"}
            anchor="left"
            open={drawerOpen}
            ModalProps={{ onBackdropClick: handleClose }}
        >
            <Toolbar />
            <Box
                sx={{ overflow: 'auto' }}
            >
                {menuList.length ? (
                    <List sx={{ pr: '7px' }}>
                        {menuList.map((route, index) => (
                            <CustomListItem key={route.label} disablePadding onClick={() => setSidebar(isSmall)} button>
                                <CustomLinkStyle to={route.path}>
                                    <ListItemIcon>
                                        {route.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={route.label} />
                                </CustomLinkStyle>
                            </CustomListItem>
                        ))}
                    </List>
                ) : (
                    <List>
                        <Stack spacing={1}>
                            <Skeleton variant="rounded" width={230} height={45} animation="wave" />
                            <Skeleton variant="rounded" width={230} height={45} animation="wave" />
                            <Skeleton variant="rounded" width={230} height={45} animation="wave" />
                        </Stack>
                    </List>

                )}

            </Box>
        </Drawer>
    );
}

export default SideBar;