import * as React from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { get_data } from "../../../config/api";
import { updateLoading } from "../../../features/themeSlice";

const Data = props => {
    const {
        halaman,
        endpoint,
        columns
    } = props;
    const dispatch = useDispatch();
    const load = JSON.parse(localStorage.getItem(halaman));
    const [pageState, setPageState] = React.useState({
        data: [],
        total: 0,
        page: load ? load.page : 1,
        pageSize: load ? load.pageSize : 3,
        totalPage: 0,
        sortModel: [{
            field: load.sort_field ? load.sort_field : 'id',
            sort: load.sort_direction ? load.sort_direction : 'desc'
        }]
    });

    React.useEffect(() => {
        dispatch(updateLoading(true));
        get_data({ endpoint: endpoint, pageSize: pageState.pageSize, page: pageState.page, sort_field: pageState.sortModel[0].field, sort_direction: pageState.sortModel[0].sort }).then((e) => {
            dispatch(updateLoading(false));
            if (e.status === 200) {
                setPageState((old) => ({ ...old, data: e.data.data, total: e.data.total, totalPage: e.data.last_page }));
                localStorage.setItem(halaman, JSON.stringify({ page: pageState.page, pageSize: pageState.pageSize, sort_field: pageState.sortModel[0].field, sort_direction: pageState.sortModel[0].sort }));
            }
        }).catch((e) => {
            dispatch(updateLoading(false));
            console.log(e)
        });
    }, [dispatch, endpoint, halaman, pageState.pageSize, pageState.page, pageState.sortModel]);

    function CustomPagination() {

        return (
            <Pagination
                showFirstButton
                showLastButton
                page={pageState.page}
                count={pageState.totalPage}
                renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
                onChange={(event, value) => setPageState((old) => ({ ...old, page: value }))}
            />
        );
    }

    return (
        <DataGrid
            paginationMode='server'
            sortingMode="server"
            sortingOrder={['desc', 'asc']}
            rowsPerPageOptions={[1, 2, 3, 4]}
            checkboxSelection
            pagination
            disableSelectionOnClick
            disableColumnFilter
            disableDensitySelector
            // disableColumnSelector
            autoHeight
            rows={pageState.data}
            rowCount={pageState.total}
            columns={columns}
            pageSize={pageState.pageSize}
            sortModel={pageState.sortModel}
            onPageChange={(newPage) => setPageState(old => ({ ...old, page: newPage }))}
            onPageSizeChange={(onPageSize) => setPageState(old => ({ ...old, pageSize: onPageSize }))}
            components={{
                Pagination: CustomPagination,
                Toolbar: GridToolbar,
            }}
            componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            onSortModelChange={(value) => {
                if (value.length) {
                    setPageState(old => ({ ...old, sortModel: value }))
                } else {
                    setPageState(old => ({ ...old, sortModel: [{ field: 'id', sort: 'desc' }] }))
                }
            }
            }
        />
    );
}

export default Data;