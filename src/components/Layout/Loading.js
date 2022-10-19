import { Backdrop } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RiseLoader } from 'react-spinners';

export const Loading = () => {
    const { loading } = useSelector(state => state.theme);
    return (
        <Backdrop
        open={loading}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <RiseLoader color="#fff" size={20} />
        </Backdrop>
    )
}
