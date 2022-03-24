import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sendResetPasswordLink } from "../../redux/actions/authActions";
import classnames from "classnames";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Wave from "react-wavify";
import "./LoginForgot.css";

const LoginForgot = ({ auth, sendResetPasswordLink, history, errors }) => {

  if (auth.isAuthenticated) {
    history.push('/dashboard');
  }

  const [email, setEmail] = React.useState("");
  const onSubmit = e => {
    e.preventDefault();
    sendResetPasswordLink({email: email}, history);
  };

  return (
    <div className="Login-forgot">

    <h1 className="title-text-login-forgot">Forgot Password</h1>
    
          <div className="LoginContentForgot">
             
               <div className="back-home-link-forgot" >
                 <h1 className="desc-text-login-forgot">
                <Link  to="/login"  style={{ textDecoration: 'none' }} >
                  Login
                </Link>
                </h1>
                </div>
    
    
                  
                  <h1 className="desc-text-login-forgot">
                    Reset PassWord Below
                  </h1>
               
    
    
               <div className="form-login-forgot">
                <form  noValidate onSubmit={onSubmit}>
                   <div>
                   <h1 className="input-text-login-forgot">Email</h1>
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
    
                 <div className="button-forgot">
                    <Button
                        type="submit"
                        fullWidth
                        size="large"
                        variant="contained"
                    >
                      Reset Password
                    </Button>
                    </div>
                </form>
                </div>
              </div>
           
  
        </div>
  );
};

LoginForgot.propTypes = {
  sendResetPasswordLink: PropTypes.func.isRequired,
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
    { sendResetPasswordLink }
)(LoginForgot);



/*
 <div className="header-profile-login-forgot">
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