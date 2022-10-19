import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../features/notificationSlice";

const CustomizedSnackbars = () => {
    const dispatch = useDispatch();
    const { snackbarOpen, snackbarType, snackbarMessage } = useSelector(state => state.notification);
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(setNotification({ snackbarOpen: false, snackbarType, snackbarMessage }));
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleClose}
            sx={{ top: { xs: 60, sm: 70 } }}
        >
            <Alert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                severity={snackbarType}
            >
                {snackbarMessage}
            </Alert>
        </Snackbar>
    );
};

export default CustomizedSnackbars;