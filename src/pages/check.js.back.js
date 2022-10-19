async function initialize() {
    const csrf = await api().get('/sanctum/csrf-cookie');

    console.log('CSRF =', csrf);
}

async function getUser() {
    const user = await api().get('/api/user');

    console.log('User', user.data);
}

async function logout() {
    const logout = await api().post('/api/logout');

    console.log('Logout', logout);
}

async function login() {
    const login = await api().post('/api/login', {
        email: 'asdasd@adsa.com',
        password: 'ilovecats',
    });

    console.log('Login', login);
}

            {/* <Button variant="contained" onClick={() => initialize()}>Init CSRF</Button>
            <Button variant="contained" onClick={() => login()}>Login</Button>
            <Button variant="contained" onClick={() => getUser()}>Get User</Button>
            <Button variant="contained" onClick={() => logout()}>Logout</Button> */}