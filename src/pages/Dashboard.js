import * as React from 'react';
import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Chart from "react-apexcharts";
import { Pencapaian } from '../components/pages/dashboard';
import Layout from '../layout/Layout';

const Dashboard = props => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    // USER ACCESS
    React.useEffect(() => {
        if (user) {
            if (user.role !== 'customer_service' || user.role !== 'owner') {
                if (user.role === 'root') {
                    navigate('/data_user', { replace: true });
                }
                if (user.role === 'desainer') {
                    navigate('/antrian', { replace: true });
                }
                if (user.role === 'admin_produksi') {
                    navigate('/antrian', { replace: true });
                }
            }
        }
    }, [user, navigate])

    // CHART OMSET
    const [chartOmset, setChartOmset] = React.useState({
        jenis: 'harian',
        harian: {
            bulan: '',
            tahun: '',
        },
        bulanan: {
            tahun: '',
        },
        tahunan: {
            tahun1: '',
            tahun2: '',
        },
        options: {
            chart: {
                redrawOnWindowResize: true,
                redrawOnParentResize: true
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
        },
        series: [
            {
                name: "Jersey",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            },
            {
                name: "Jersey Pack",
                data: [60, 10, 50, 20, 30, 80, 50, 100]
            },
            {
                name: "Sablon",
                data: [70, 30, 75, 20, 59, 10, 20, 61]
            },
        ]
    });

    const TabOmset = props => {
        const { jenis } = props;
        if (jenis === 'harian') {
            return (
                <>
                    <Grid item md={3} sm={6} xs={6} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Bulan</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={10}
                                label="Age"
                                size='small'
                            // onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid >
                    <Grid item md={3} sm={6} xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tahun</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={10}
                                label="Age"
                                size='small'
                            // onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </>
            );
        }

        if (jenis === 'bulanan') {
            return (
                <>
                    <Grid item md={6} sm={12} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tahun</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={10}
                                label="Age"
                                size='small'
                            // onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </>
            );
        }

        if (jenis === 'tahunan') {
            return (
                <>
                    <Grid item md={3} sm={6} xs={6} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tahun 1</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={10}
                                label="Age"
                                size='small'
                            // onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid >
                    <Grid item md={3} sm={6} xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tahun 2</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={10}
                                label="Age"
                                size='small'
                            // onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </>
            );
        }

    }

    const handleType = (type, jenis) => {
        if (type === 'omset') {
            if (chartOmset.jenis !== jenis) {
                setChartOmset(old => ({ ...old, jenis }));
            }
        }
        if (type === 'source') {
            if (chartSource.jenis !== jenis) {
                setChartSource(old => ({ ...old, jenis }));
            }
        }
        if (type === 'item') {
            if (chartItem.jenis !== jenis) {
                setChartItem(old => ({ ...old, jenis }));
            }
        }
    }

    // CHART SOURCE
    const [chartSource, setChartSource] = React.useState({
        jenis: 'harian',
        harian: {
            bulan: '',
            tahun: '',
        },
        bulanan: {
            tahun: '',
        },
        tahunan: {
            tahun1: '',
            tahun2: '',
        },
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
        },
        series: [
            {
                name: "Jersey",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            },
            {
                name: "Jersey Pack",
                data: [60, 10, 50, 20, 30, 80, 50, 100]
            },
            {
                name: "Sablon",
                data: [70, 30, 75, 20, 59, 10, 20, 61]
            },
        ]
    });

    // CHART ITEM
    const [chartItem, setChartItem] = React.useState({
        jenis: 'harian',
        harian: {
            bulan: '',
            tahun: '',
        },
        bulanan: {
            tahun: '',
        },
        tahunan: {
            tahun1: '',
            tahun2: '',
        },
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
        },
        series: [
            {
                name: "Jersey",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            },
            {
                name: "Jersey Pack",
                data: [60, 10, 50, 20, 30, 80, 50, 100]
            },
            {
                name: "Sablon",
                data: [70, 30, 75, 20, 59, 10, 20, 61]
            },
        ]
    });

    const TabSource = props => {
        const { jenis } = props;
        if (jenis === 'harian') {
            return (
                <>
                    <Grid item md={3} sm={6} xs={6} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Bulan</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={10}
                                label="Age"
                                size='small'
                            // onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid >
                    <Grid item md={3} sm={6} xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tahun</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={10}
                                label="Age"
                                size='small'
                            // onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </>
            );
        }

        if (jenis === 'bulanan') {
            return (
                <>
                    <Grid item md={6} sm={12} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tahun</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={10}
                                label="Age"
                                size='small'
                            // onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </>
            );
        }

        if (jenis === 'tahunan') {
            return (
                <>
                    <Grid item md={3} sm={6} xs={6} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tahun 1</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={10}
                                label="Age"
                                size='small'
                            // onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid >
                    <Grid item md={3} sm={6} xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tahun 2</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={10}
                                label="Age"
                                size='small'
                            // onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </>
            );
        }
    }

    return (
        <Layout>
            <div>
                {/* Content */}

                {/*  PENCAPAIAN AND TARGET */}
                <Pencapaian />

                <div style={{ paddingBottom: 20 }}>
                    <Card>
                        <CardContent>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                spacing={3}
                                pb={2}
                            >
                                <Grid item xs={12} md={6}>
                                    <Typography>Omset Order</Typography>
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <Button
                                        size='small'
                                        variant='contained'
                                        sx={{ width: '-webkit-fill-available', backgroundColor: chartOmset.jenis === 'harian' ? '#1976d2 !important' : 'grey !important' }}
                                        onClick={() => handleType('omset', 'harian')}
                                    >
                                        Harian
                                    </Button>
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <Button
                                        size='small'
                                        variant='contained'
                                        sx={{ width: '-webkit-fill-available', backgroundColor: chartOmset.jenis === 'bulanan' ? '#1976d2 !important' : 'grey !important' }}
                                        onClick={() => handleType('omset', 'bulanan')}
                                    >
                                        Bulanan
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Button
                                        size='small'
                                        variant='contained'
                                        sx={{ width: '-webkit-fill-available', backgroundColor: chartOmset.jenis === 'tahunan' ? '#1976d2 !important' : 'grey !important' }}
                                        onClick={() => handleType('omset', 'tahunan')}
                                    >
                                        Tahunan
                                    </Button>
                                </Grid>
                                <Grid item md={6} sm={12} xs={12} sx={{ paddingTop: '0 !important' }} />
                                <TabOmset jenis={chartOmset.jenis} />
                            </Grid>
                            {/* <Divider /> */}
                            <Chart
                                options={chartOmset.options}
                                series={chartOmset.series}
                                type="line"
                                height={400}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div style={{ paddingBottom: 20 }}>
                    <Card>
                        <CardContent>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                spacing={3}
                                pb={2}
                            >
                                <Grid item xs={12} md={6}>
                                    <Typography>Source Order</Typography>
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <Button
                                        size='small'
                                        variant='contained'
                                        sx={{ width: '-webkit-fill-available', backgroundColor: chartSource.jenis === 'harian' ? '#1976d2 !important' : 'grey !important' }}
                                        onClick={() => handleType('source', 'harian')}
                                    >
                                        Harian
                                    </Button>
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <Button
                                        size='small'
                                        variant='contained'
                                        sx={{ width: '-webkit-fill-available', backgroundColor: chartSource.jenis === 'bulanan' ? '#1976d2 !important' : 'grey !important' }}
                                        onClick={() => handleType('source', 'bulanan')}
                                    >
                                        Bulanan
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Button
                                        size='small'
                                        variant='contained'
                                        sx={{ width: '-webkit-fill-available', backgroundColor: chartSource.jenis === 'tahunan' ? '#1976d2 !important' : 'grey !important' }}
                                        onClick={() => handleType('source','tahunan')}
                                    >
                                        Tahunan
                                    </Button>
                                </Grid>
                                <Grid item md={6} sm={12} xs={12} sx={{ paddingTop: '0 !important' }} />
                                <TabSource jenis={chartSource.jenis} />
                            </Grid>
                            <Chart
                                options={chartSource.options}
                                series={chartSource.series}
                                type="bar"
                                height={400}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div style={{ paddingBottom: 20 }}>
                    <Card>
                        <CardContent>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                spacing={3}
                                pb={2}
                            >
                                <Grid item xs={12} md={6}>
                                    <Typography>Item Order</Typography>
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <Button
                                        size='small'
                                        variant='contained'
                                        sx={{ width: '-webkit-fill-available', backgroundColor: chartItem.jenis === 'harian' ? '#1976d2 !important' : 'grey !important' }}
                                        onClick={() => handleType('item', 'harian')}
                                    >
                                        Harian
                                    </Button>
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <Button
                                        size='small'
                                        variant='contained'
                                        sx={{ width: '-webkit-fill-available', backgroundColor: chartItem.jenis === 'bulanan' ? '#1976d2 !important' : 'grey !important' }}
                                        onClick={() => handleType('item', 'bulanan')}
                                    >
                                        Bulanan
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Button
                                        size='small'
                                        variant='contained'
                                        sx={{ width: '-webkit-fill-available', backgroundColor: chartItem.jenis === 'tahunan' ? '#1976d2 !important' : 'grey !important' }}
                                        onClick={() => handleType('item', 'tahunan')}
                                    >
                                        Tahunan
                                    </Button>
                                </Grid>
                                <Grid item md={6} sm={12} xs={12} sx={{ paddingTop: '0 !important' }} />
                                <TabSource jenis={chartItem.jenis} />
                            </Grid>
                            <Chart
                                options={chartItem.options}
                                series={chartItem.series}
                                type="bar"
                                height={400}
                            />
                        </CardContent>
                    </Card>
                </div>

            </div>
        </Layout>
    );
}

export default Dashboard;