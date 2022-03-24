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

const Login = ({errors, auth, loginUser, history}) => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  if (auth.isAuthenticated) {
    history.push('/dashboard');
  }

  const onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    };

    loginUser(userData);
  };

  return (
    <div className="Login">



    <h1 className="title-text-login">Login</h1>

      <div className="LoginContent">
           <div className="back-home-link" >
             <h1 className="desc-text-login">
            <Link  to="/"  style={{ textDecoration: 'none' }} >
              Back to Home
            </Link>
            </h1>
            </div>


              
              <h1 className="desc-text-login">
                Don't have an account? <Link to="/register" style={{ textDecoration: 'none' }} >Register</Link>
              </h1>
           


           <div className="form-login">
            <form  noValidate onSubmit={onSubmit}>
               <div>
               <h1 className="input-text-login">Email</h1>
                <TextField
                   fullWidth
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames(" ", {
                      invalid: errors.email || errors.emailnotfound
                    })}
                />
                
                <span className="red-text">
                {errors.email}
                  {errors.emailnotfound}
              </span>
              </div>


             <div>
             <h1 className="input-text-login">Password</h1>
                <TextField
                    fullWidth
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames(" ", {
                      invalid: errors.password || errors.passwordincorrect
                    })}
                />
                <span className="red-text">
                {errors.password}
                {errors.passwordincorrect}
              </span>
              </div>
             
             <div className="button">
                <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                >
                  Login
                </Button>
                </div>
            </form>
            </div>


              <h1 className="forget-password-text-login">
                Forget password? <Link to="/forgotpassword" style={{ textDecoration: 'none' }} >Reset Password</Link>
              </h1>
         
          </div>
       

     
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);


/*

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

*/