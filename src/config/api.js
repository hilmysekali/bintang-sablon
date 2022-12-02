import axios from 'axios';

export const api = () => {
    const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        }
    })

    api.interceptors.response.use(response => response, error => {
        if (error.response.status === 401) {
            localStorage.removeItem('user');
            localStorage.removeItem('role');
            return Promise.reject();
        }
    })

    return api
}

export const csrf = async () => {
    const get = await api().get('/sanctum/csrf-cookie');
    return get;
}

export const get_data = async (props) => {
    const { endpoint, pageSize, page, sort_field, sort_direction, search, filter_field, filter_value } = props;
    const get = await api().get(`/api/${endpoint}?page=${page}&pageSize=${pageSize}&sort=${sort_field}&direction=${sort_direction}&filter_field=${filter_field}&filter_value=${filter_value ? filter_value : ''}&q=${search}`);
    return get;
}

export const get_single_data = async (props) => {
    const { endpoint, id } = props;
    const get = await api().get(`/api/${endpoint}/${id}`);
    return get
}

export const create_data = async (props) => {
    const { endpoint, values, rest } = props;
    const create = await api().post(`/api/${endpoint}`, values, rest);
    return create;
}

export const update_data = async (props) => {
    const { endpoint, id, values, rest } = props;
    const update = await api().put(`/api/${endpoint}/${id}`, values, rest);
    return update;
}

export const delete_data = async (props) => {
    const { endpoint, id, rest } = props;
    const hapus = await api().delete(`/api/${endpoint}/${id}`, rest);
    return hapus;
}