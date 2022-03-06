import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as Yup from 'yup';
import { useState } from 'react';
import { registerUser } from "../../redux/actions/authActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Wave from "react-wavify";
import classnames from "classnames";
import "./Register.css";
import Iconify from './Iconify';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Stack,
  Checkbox,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

const Register = ({ auth,registerUser, history }) => {


  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Password is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    password2: Yup.string().required('Password is required'),
    
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password2: ''
    },

    validationSchema: RegisterSchema,
    onSubmit: () => {
     
      const newUser = {
        name: values.name,
        email: values.email,
        password: values.password,
        password2: values.password2
      };
    
      registerUser(newUser, history);
    }
  });

  if (auth.isAuthenticated) {
    history.push("/dashboard");
  }

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };


  const handleShowPassword2 = () => {
    setShowPassword2((show) => !show);
  };
  
  return (
  
    <div className="Register">

    <div className="header-profile-register">
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
    
    <h1 className="title-text-register">Register</h1>
    
          <div className="RegisterContent">
    
            <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Name"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />


<TextField
                fullWidth
                type="email"
                label="Email address"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
    
              <TextField
                fullWidth
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


<TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Password2"
                {...getFieldProps('password2')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword2} edge="end">
                        <Iconify icon={showPassword2 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                error={Boolean(touched.password2 && errors.password2)}
                helperText={touched.password2 && errors.password2}
              />
            </Stack>
             <div className="button-register">
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Register
            </LoadingButton>

            </div>
          </Form>
        </FormikProvider>
          </div>
    
          <div className="footer-profile-register">
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));