import { AccountCircle, Key as KeyIcon } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(state => state.auth);

  useEffect(() => {
    if (isSuccess) {
      navigate("/", { replace: true });
      dispatch(reset());
    }
  }, [user, isSuccess, isError, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ username, password }));
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh', backgroundColor: '#2727272e' }}
      >
        <Card sx={{ minWidth: 500 }}>
          <CardHeader title={'Login Pak'} style={{ justifyContent: 'center' }}/>
          <CardContent style={{ justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', p: 2 }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.8 }} />
              <TextField label="Username" variant="outlined" size="small" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', p: 2 }}>
              <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.8 }} />
              <TextField label="Password" variant="outlined" size="small" />
            </Box>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button variant='contained'>
              Login Fren
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <section className="hero is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4">
                <form onSubmit={Auth} className="box">
                  {isError && <p className="has-text-centered">{message}</p>}
                  <h1 className="title is-2">Sign In</h1>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        type="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="******"
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <button
                      type="submit"
                      className="button is-success is-fullwidth"
                    >
                      {isLoading ? "Loading..." : "Login"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;