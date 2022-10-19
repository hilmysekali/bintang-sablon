import { Divider, Typography } from "@mui/material";

const Footer = () => {
    return (
        <>
            <Divider>
                <Typography sx={{
                    fontWeight: 600,
                    color: 'gray',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                    textDecoration: 'none',
                }}>Powered by Armadatech</Typography>
            </Divider>
        </>
    );
}

export default Footer;