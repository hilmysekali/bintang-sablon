import * as React from 'react';
import {
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Typography,
    Divider
} from '@mui/material';
import {
    BookmarkBorder as BookmarkBorderIcon,
    AccountCircle as AccountCircleIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';
import { api } from '../../../config/api';
import { useNavigate } from 'react-router-dom';
import { reset } from '../../../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
const Profile = () => {
    const { loading } = useSelector(state => state.theme);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { user } = useSelector(state => state.auth);

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logoutFunction = async () => {
        const logout = await api().post('/api/logout').then((e) => {
            if(e.status === 200) {
                localStorage.removeItem('user');
                navigate('/');
                dispatch(reset());
            }
        });
        return logout;
    }

    return (
        <>
            <Tooltip title="Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ border: '3px solid white' }} alt="Remy Sharp" src="https://upload.wikimedia.org/wikipedia/commons/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem sx={{pointerEvents: 'none', cursor: 'default'}}>
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center" noWrap>{user ? user.name : '-'}</Typography>
                </MenuItem>
                <MenuItem sx={{pointerEvents: 'none', cursor: 'default'}}>
                    <ListItemIcon>
                        <BookmarkBorderIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center" noWrap>{user ? user.username : '-'}</Typography>
                </MenuItem>
                <MenuItem sx={{pointerEvents: 'none', cursor: 'default'}}>
                    <ListItemIcon>
                        <BookmarkBorderIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center" noWrap>{user ? user.role : '-'}</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => logoutFunction()} disabled={loading}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </>
    );
}

export default Profile;