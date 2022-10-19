import * as React from 'react';
import { Typography } from "@mui/material";
import Layout from '../layout/Layout';
import CustomPaginationActionsTable from "../layout/DataTable";

const Pendapatan = props => {
    return (
        <Layout>
            {/* Title Container */}
            <Typography>Pendapatan</Typography>

            {/* Content */}
            <CustomPaginationActionsTable />
        </Layout>
    );
}

export default Pendapatan;