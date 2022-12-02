import * as React from 'react'
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiseLoader } from 'react-spinners';

const Initial = () => {
    const { user, isSuccess } = useSelector(state => state.auth);
    const navigate = useNavigate();
    React.useEffect(() => {
        if (isSuccess) {
            if (user.role === 'root') {
                navigate('/data_user', { replace: true });
            }
            if (user.role === 'customer_service') {
                navigate('/dashboard', { replace: true });
            }
            if (user.role === 'desainer') {
                navigate('/antrian', { replace: true });
            }
            if (user.role === 'admin_produksi') {
                navigate('/antrian', { replace: true });
            }
            if (user.role === 'owner') {
                navigate('/dashboard', { replace: true });
            }
        }
    }, [navigate, user, isSuccess]);

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh', backgroundColor: '#fff' }}
        >
            <Grid item xs={3}>
                <RiseLoader color="#1976d2" size={20} />
            </Grid>

        </Grid>
    );
}

export default Initial;