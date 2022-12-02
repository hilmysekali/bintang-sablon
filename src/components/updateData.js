import { update_data } from "../config/api";
import { setNotification } from "../features/notificationSlice";
import { updateLoading } from "../features/themeSlice";

const getData = props => {
    const { endpoint, pageSize, page, sortModel, halaman, search, setPageState, dispatch } = props
    setPageState((old) => ({ ...old, loading: true }));
    update_data({ endpoint: endpoint, pageSize: pageSize, page: page, sort_field: sortModel[0].field, sort_direction: sortModel[0].sort, search: search }).then((e) => {
        if (e.status === 200) {
            setPageState((old) => ({ ...old, data: e.data.data, total: e.data.total, totalPage: e.data.last_page }));
            localStorage.setItem
                (halaman, JSON.stringify({ page: page, pageSize: pageSize, sort_field: sortModel[0].field, sort_direction: sortModel[0].sort }));
        }
        setPageState((old) => ({ ...old, loading: false }));
        dispatch(updateLoading(false));
    }).catch((e) => {
        setPageState((old) => ({ ...old, loading: false }));
        dispatch(updateLoading(false));
        dispatch(
            setNotification(
                {
                    snackbarOpen: true,
                    snackbarType: "error",
                    snackbarMessage: "Gagal Memuat Data! Silahkan periksa koneksi internet anda!"
                }
            ));
    });
}

export default getData;
