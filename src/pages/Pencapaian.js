import * as React from 'react';
import { Typography } from "@mui/material";
import Layout from '../layout/Layout';
import CustomPaginationActionsTable from "../layout/DataTable";

const Pencapaian = props => {
    return (
        <Layout>
            {/* Title Container */}
            <Typography>Pencapaian</Typography>

            {/* Content */}
            <CustomPaginationActionsTable />
        </Layout>
    );
}

export default Pencapaian;