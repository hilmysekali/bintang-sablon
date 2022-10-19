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
        if (!error.response) {
            // console.log(window.location.href)
            if (window.location.href !== process.env.REACT_APP_BASE_URL + '/refused') {
                window.location.replace(`/refused`);
            }
            return Promise.reject();
        }
        if (error.response.status === 401) {
            // logOut()
            if (window.location.href !== process.env.REACT_APP_BASE_URL + '/login') {
                window.location.replace(`/login`);
            }
            return Promise.reject();
        }

        if (error.response.status === 419) {
            window.location.replace(process.env.REACT_APP_BASE_URL);
        }

        return Promise.reject(error)
    })

    return api
}

export const csrf = async () => {
    const get = await api().get('/sanctum/csrf-cookie');
    return get;
}

export const get_data = async (props) => {
    const { endpoint, pageSize, page, sort_field, sort_direction } = props;
    const get = await api().get(`/api/${endpoint}?page=${page}&pageSize=${pageSize}&sort=${sort_field}&direction=${sort_direction}`);
    return get;
}

export const get_single_data = async (props) => {
    const { endpoint, id } = props;
    const get = await api().get(`/api/${endpoint}/${id}`);
    return get
}