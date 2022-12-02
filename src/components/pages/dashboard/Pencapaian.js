import React from 'react';
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import Chart from "react-apexcharts";

const Pencapaian = () => {
    // CHART RADIAL PENCAPAIAN
    const [chartPencapaian] = React.useState({
        series: [100],
        options: {
            chart: {
                height: 350,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    startAngle: -180,
                    endAngle: 180,
                    hollow: {
                        size: '50%',
                    }
                },
            },
            labels: ['Target'],
        },
    });
    return (
        <div style={{ paddingBottom: 20 }}>
            <Card sx={{ pb: 2 }}>
                <CardContent>
                    <Grid container>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography>Pencapaian</Typography>
                            <Typography>April 2022</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item md={7} sm={12} xs={12}>
                            <Chart
                                options={chartPencapaian.options}
                                series={chartPencapaian.series}
                                type="radialBar"
                                height={300}
                            />
                        </Grid>
                        <Grid item md={3} sm={12} xs={12} alignSelf='center' textAlign={'center'}>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                            >
                                <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>Target</Typography>
                                <Typography sx={{ fontSize: 22, fontWeight: 'bold' }}>1.000.000.000,00</Typography>
                                <Divider />
                                <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: 'blue' }}>Pencapaian</Typography>
                                <Typography sx={{ fontSize: 22, fontWeight: 'bold' }}>750.000.000,00</Typography>
                                <Divider />
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Typography sx={{ fontSize: 12, color: 'red', fontWeight: 'bold' }}>- 750.000.000,00 </Typography>
                                    <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>&nbsp;/&nbsp;</Typography>
                                    <Typography sx={{ fontSize: 12, color: 'green', fontWeight: 'bold' }}>+ 750.000.000,00 </Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Chart
                                options={chartPencapaian.options}
                                series={chartPencapaian.series}
                                type="radialBar"
                                height={300}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default Pencapaian;