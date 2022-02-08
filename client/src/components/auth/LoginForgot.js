import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import classnames from "classnames";

const LoginForgot = ({ auth, loginUser, history, errors }) => {

const [isSubmited, setIsSubmited] = React.useState(false);
  
  const onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    };

    loginUser(userData);
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
    { loginUser }
)(LoginForgot);
