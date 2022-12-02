import { Button } from "@mui/material";

const ActionButton = props => {
    const { onClick, title, color } = props;
    return (
        <Button color={color} variant="contained" sx={{ width: '-webkit-fill-available' }} onClick={onClick}>
            {title}
        </Button>
    );
}

export default ActionButton;