import * as React from 'react';
import { Backdrop, Typography } from "@mui/material";

export const NotFound = () => {
    return (
        <>
        <Typography component={'h1'}>Go Back! Not Found Page.</Typography>
        </>
    );
}

export const Restricted = () => {
    return (
        <>
        <Typography component={'h1'}>You are not Allowed Here. Please go back.</Typography>
        </>
    );
}

export const Refused = () => {
    return (
        <Backdrop
            open={true}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <Typography>Server Error. Please Reload this page!</Typography>
        </Backdrop>
    );
}