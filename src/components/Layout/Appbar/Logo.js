import Typography from '@mui/material/Typography';

const Logo = () => {
    return (
        <>
            <img
                alt='bintang sablon'
                src='/btg.svg'
                height={30}
                style={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    // flexGrow: 1,
                }}
            />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'flex', lg: 'flex', xl: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    flexGrow: 1,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
            </Typography>
        </>
    );
}

export default Logo;