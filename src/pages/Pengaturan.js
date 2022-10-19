import * as React from 'react';
import { Typography } from "@mui/material";
import Layout from '../layout/Layout';
import CustomPaginationActionsTable from "../layout/DataTable";

const Pengaturan = props => {
    return (
        <Layout>
            {/* Title Container */}
            <Typography>Pengaturan</Typography>

            {/* Content */}
            <CustomPaginationActionsTable />
        </Layout>
    );
}

export default Pengaturan;