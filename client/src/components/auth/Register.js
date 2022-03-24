import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useState } from 'react';
import { registerUser } from "../../redux/actions/authActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Wave from "react-wavify";
import classnames from "classnames";
import "./Register.css";

const Register = ({ auth, errors, registerUser, history }) => {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  if (auth.isAuthenticated) {
    history.push('/dashboard');
  }

  const onSubmit = e => {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password,
      password: password,
      password2: password2
    };

    registerUser(newUser, history);  
  };

  return (
    <div className="Register">



<h1 className="title-text-register">Register</h1>

      <div className="LoginContent">
         
           <div className="back-home-link" >
             <h1 className="desc-text-register">
            <Link  to="/"  style={{ textDecoration: 'none' }} >
              Back to Home
            </Link>
            </h1>
            </div>


              
              <h1 className="desc-text-register">
                Already have an account? <Link to="/login" style={{ textDecoration: 'none' }} >Login</Link>
              </h1>
           


           <div className="form-register">
            <form  noValidate onSubmit={onSubmit}>


            <div>

               <h1 className="input-text-register">Name</h1>
                <TextField
                   fullWidth
                   onChange={e => setEmail(e.target.value)}
                   value={name} 
                   error={errors.name}
                    id="name"
                    type="text"
                    className={classnames(" ", {
                      invalid: errors.name
                    })}
                />
                
                <span className="red-text">
                {errors.name}
              </span>
              </div>


               <div>
               <h1 className="input-text-register">Email</h1>
                <TextField
                   fullWidth
                   onChange={e => setEmail(e.target.value)}
                   value={email}
                   error={errors.email}
                    id="email"
                    type="email"
                    className={classnames(" ", {
                      invalid: errors.email 
                    })}
                />
                
                <span className="red-text">
                {errors.email}
              </span>
              </div>


              <div>
             <h1 className="input-text-register"> Password</h1>
                <TextField
                    fullWidth
                    onChange={e => setPassword(e.target.value)}
                  value={password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <span className="red-text">
                {errors.password}
              </span>
              </div>

             <div>
             <h1 className="input-text-register"> Confirm Password</h1>
                <TextField
                    fullWidth
                    onChange={e => setPassword2(e.target.value)}
                  value={password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <span className="red-text">
                {errors.password2}
              </span>
              </div>
             
             <div className="button-register">
                <Button
                    
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                >
                  Register
                </Button>
                </div>
            </form>
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


/*

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



*/