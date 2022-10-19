import { Button, Fab, useTheme, useMediaQuery } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";


const AddButton = props => {
    const { ...rest } = props;
    const { title } = props;
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    if (isSmall) {
        return (
            <Fab
                sx={{
                    display: isSmall ? '' : 'none',
                    position: 'fixed',
                    bottom: 20,
                    right: 10,
                }}
                variant="extended" size="large" color="primary" aria-label="add"
                {...rest}>
                <AddIcon sx={{ mr: 1 }} />{title}
            </Fab>
        );
    } else {
        return (
            <Button
                sx={{ display: isSmall ? 'none' : '' }}
                size="small"
                variant="contained"
                startIcon={<AddIcon />}
                {...rest}
            >
                {title}
            </Button>
        );
    }
}

export default AddButton;