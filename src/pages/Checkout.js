import * as React from 'react';
import { Typography } from "@mui/material";
import Layout from '../layout/Layout';
import CustomPaginationActionsTable from "../layout/DataTable";

const Checkout = props => {
    return (
        <Layout>
            {/* Title Container */}
            <Typography>Checkout</Typography>

            {/* Content */}
            <CustomPaginationActionsTable />
        </Layout>
    );
}

export default Checkout;