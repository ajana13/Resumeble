import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import classnames from "classnames";
import M from "materialize-css";
import loginBack from "./images/moutin.jpg";
import './Login.css';

const Login = ({ auth, loginUser, history, errors }) => {

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
    <div>
    <div  style={{backgroundImage: `url(${loginBack})`,backgroundSize: "cover", height: "100vh",overflow: "auto"}}>
      <div className="container" style={{backgroundColor:"rgba(0, 0, 0, 0.7)",marginTop:"20%" }}>
        <div className="row"  >
          <div className="col s8 offset-s2" >
            <Link to="/" className="btn-flat waves-effect ">
              <i className="material-icons left ">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4 className="white-text">
                <b className="white-text">Login</b> below
              </h4>
              <p className="white-text text-darken-1">
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
                    className={classnames("white-text", {
                      invalid: errors.email || errors.emailnotfound
                    })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                {errors.email}
                  {errors.emailnotfound}
              </span>
              </div>
              <div className="input-field col s12">
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("white-text", {
                      invalid: errors.password || errors.passwordincorrect
                    })}
                />
                <label htmlFor="password">Password</label>
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
                  Login
                </button>
              </div>
            </form>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <p className="white-text text-darken-1">
                Forget password? <Link to="/forgotpassword">Reset Password</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
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
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
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
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
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
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
   */