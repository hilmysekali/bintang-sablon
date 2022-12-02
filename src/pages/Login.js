import * as React from 'react';
import io from 'socket.io-client';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../features/authSlice';
import { setNotification } from '../features/notificationSlice';
import { updateLoading } from '../features/themeSlice';
import { Grid } from '@mui/material';

const socket = io.connect('http://localhost:3001');

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Powered '}
            <Link color="inherit" href="https://armadacom.id/" target={'_blank'}>
                Armadacom
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Login = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuccess, isLoading } = useSelector(state => state.auth);

    React.useEffect(() => {
        if (isSuccess) {
            navigate("/", { replace: true });
            // dispatch(reset());
        }
    }, [isSuccess, dispatch, navigate]);

    React.useEffect(() => {
        document.title = `${process.env.REACT_APP_SITE_TITLE} | Login`;
    })

    const Auth = (e) => {
        e.preventDefault();
        dispatch(updateLoading(true));
        dispatch(LoginUser({ username, password })).then((e) => {
            dispatch(updateLoading(false));
            if (e.error) {
                socket.emit('createAntrian', { message: 'oke' });
                dispatch(
                    setNotification(
                        {
                            snackbarOpen: true,
                            snackbarType: "error",
                            snackbarMessage: "Login Gagal! Username atau Password Salah!"
                        }
                    ));
            } else {
                dispatch(
                    setNotification(
                        {
                            snackbarOpen: true,
                            snackbarType: "success",
                            snackbarMessage: "Berhasil Login!"
                        }
                    ));
            }
        });
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >

            <Grid item xs={1}>
                <CssBaseline />
                <Box
                    sx={{
                        // marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 10
                    }}
                >
                    {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar> */}
                    <img src='/login-logo.svg' alt='Logo Bintang Sablon' />
                    <Box component="form" onSubmit={Auth} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username / Kode User"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isLoading ? "Loading..." : "Login"}
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Grid>
        </Grid>
    );
}

export default Login;