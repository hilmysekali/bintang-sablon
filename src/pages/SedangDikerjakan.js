import * as React from 'react';
import { Typography } from "@mui/material";
import Layout from '../layout/Layout';
import CustomPaginationActionsTable from "../layout/DataTable";

const SedangDikerjakan = props => {
    return (
        <Layout>
            {/* Title Container */}
            <Typography>SedangDikerjakan</Typography>

            {/* Content */}
            <CustomPaginationActionsTable />
        </Layout>
    );
}

export default SedangDikerjakan;