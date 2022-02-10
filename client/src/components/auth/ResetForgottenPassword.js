import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import classnames from "classnames";

const ResetForgottenPassword = ({ auth, history, errors }) => {
  if (auth.isAuthenticated) {
    history.push('/dashboard');
  }

  const [password, setPassword] = React.useState("");
  const [passwordTwice, setPasswordTwice] = React.useState("");

  const onSubmit = e => {
    e.preventDefault();

    const userData = {
      password: password,
      secondPassword:  passwordTwice
    };

    
    // ResetPasswordAction(values, history);
  };

  return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Reset password below</b> below
              </h4>
            </div>
            <form noValidate onSubmit={onSubmit}>
              <div className="input-field col s12">
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password || errors.passwordincorrect
                    })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                    {errors.password}
                    {errors.passwordincorrect}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                    onChange={e => setPasswordTwice(e.target.value)}
                    value={passwordTwice}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password || errors.passwordincorrect
                    })}
                />
                <label htmlFor="password">Retype Password</label>
                <span className="red-text">
                    {errors.password}
                    {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

ResetForgottenPassword.propTypes = {
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
)(ResetForgottenPassword);