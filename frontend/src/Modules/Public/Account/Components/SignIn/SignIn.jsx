import React, { Component } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import registerService from "../../Service/AccountService";
import Form from "../../../../../Shared/Components/Form";
import CircularProgress from '@mui/material/CircularProgress';
import {Link } from "react-router-dom"




export class SignIn extends Form {
  constructor(props) {
    super(props);
    this.state = {
      form: this._getInitFormData({
        email: "",
        password: "",
      }),
      message: "",
    }
    
  }

  componentDidMount() {
    console.log(this.state.form);

  }


  onSubmit = async () => {
    this._validateForm();
    const { email, password } = this.state.form;
    if (this._isFormValid()) {
      const params = new URLSearchParams();
      params.append("grant_type", "password");
      params.append("username", email.value);
      params.append("password", password.value);
      await registerService
        .accessAuthToken(params)
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          window.location.replace("/");
        })
        .catch((err) => {
          this.setState({
            message:
              "Đăng nhập thất bại",
          });
        });
    } else {
      console.log("in valid");
    }

  }


  render() {
    const { email, password } = this.state.form;
    const theme = createTheme();
    return (
      <>
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >

                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>

                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email.value}
                    onChange={(ev) => this._setValue(ev, "email")}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password.value}
                    onChange={(ev) =>
                      this._setValue(ev, "password")}

                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    onClick={this.onSubmit}
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link to="/signup" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to="signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </>
    )
  }
}	