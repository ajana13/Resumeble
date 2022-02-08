import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sendResetPasswordLink } from "../../redux/actions/authActions";
import classnames from "classnames";

const LoginForgot = ({ auth, loginUser, history, errors }) => {


  const [email, setEmail] = React.useState("");
  const onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: email
    }

    sendResetPasswordLink(userData);
  };

  return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/login" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              Login
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b></b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={onSubmit}>
              <div className="input-field col s12">
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                      invalid: errors.email || errors.emailnotfound
                    })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                    {errors.emailnotfound}
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
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

LoginForgot.propTypes = {
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
    { sendResetPasswordLink }
)(LoginForgot);
