import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as Yup from 'yup';
import { useState } from 'react';
import { loginUser } from "../../redux/actions/authActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Wave from "react-wavify";
import classnames from "classnames";
import "./Login.css";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Stack,
  Checkbox,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from './Iconify';

const Login = ({ auth, loginUser, history}) => {


  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
     
      const userData = {
        email: values.email,
        password: values.password,
      };
      loginUser(userData);
    }
  });

  if (auth.isAuthenticated) {
    history.push("/dashboard");
  }

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <div className="Login">

<div className="header-profile-login">
        <Wave
          fill="#FA7268"
          paused={false}
          options={{
            height: 60,
            amplitatude: 40,
            speed: 0.2,
            points: 4,
          }}
        />

        <div className="wave-overlap3">
          <Wave
            fill="#e34c67"
            paused={false}
            options={{
              height: 90,
              amplitatude: 40,
              speed: 0.1,
              points: 4,
            }}
          />
        </div>

        <div className="wave-overlap4">
          <Wave
            fill="#C62368"
            paused={false}
            options={{
              height: 110,
              amplitatude: 40,
              speed: 0.1,
              points: 4,
            }}
          />
        </div>
      </div>

    <h1 className="title-text-login">Login</h1>

      <div className="LoginContent">

        <h1 className="desc-text-login">
          Don't have an account? <Link to="/register">Register</Link>
        </h1>

        <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link  variant="subtitle2" to="/forgotpassword" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
      </div>

      <div className="footer-profile-login">
        <Wave
          className="wave"
          fill="#FA7268"
          paused={false}
          options={{
            height: 60,
            amplitatude: 40,
            speed: 0.2,
            points: 4,
          }}
        />

        <div className="wave-overlap">
          <Wave
            className="wave"
            fill="#e34c67"
            paused={false}
            options={{
              height: 90,
              amplitatude: 40,
              speed: 0.1,
              points: 4,
            }}
          />
        </div>

        <div className="wave-overlap">
          <Wave
            className="wave"
            fill="#C62368"
            paused={false}
            options={{
              height: 110,
              amplitatude: 40,
              speed: 0.1,
              points: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,

});

export default connect(mapStateToProps, { loginUser })(Login);
