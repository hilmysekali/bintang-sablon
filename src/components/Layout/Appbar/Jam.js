import * as React from 'react';
import Typography from '@mui/material/Typography';

const Jam = () => {
    const [time, setTime] = React.useState(new Date());

    React.useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const tanggalJam = props => {
        const yyyy = props.getFullYear();
        let mm = props.getMonth() + 1; // Months start at 0!
        let dd = props.getDate();

        let hour = props.getHours();
        let minute = props.getMinutes();
        let second = props.getSeconds();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        if (hour < 10) hour = '0' + hour;
        if (minute < 10) minute = '0' + minute;
        if (second < 10) second = '0' + second;

        const formattedToday = dd + '-' + mm + '-' + yyyy;
        const formattedTime = hour + ':' + minute + ':' + second;
        return `${formattedToday} | ${formattedTime}`;
    }

    return (
        <Typography
            sx={{
                mr: 3,
                fontSize: { xs: '11px', md: '13px', lg: '14px', xl: '14px' },
                fontFamily: 'monospace',
                fontWeight: 500,
                color: 'white',
                textDecoration: 'none',
            }}
        >
            {tanggalJam(time)}
        </Typography>
    );
}
export default Jam;