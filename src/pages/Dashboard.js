import * as React from 'react';
import { Typography } from "@mui/material";
import Layout from '../layout/Layout';
import CustomPaginationActionsTable from "../layout/DataTable";

const Dashboard = props => {
    return (
        <Layout>
            {/* Title Container */}
            <Typography>Dashboard</Typography>

            {/* Content */}
            <CustomPaginationActionsTable />
        </Layout>
    );
}

export default Dashboard;