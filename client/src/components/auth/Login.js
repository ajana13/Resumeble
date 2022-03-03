import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Wave from "react-wavify";
import classnames from "classnames";
import "./Login.css";

const Login = ({ auth, loginUser, history, errors }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  if (auth.isAuthenticated) {
    history.push("/dashboard");
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    loginUser(userData);
  };

  return (
    <div className="Login">

<h1 className="title-text-login">Login</h1>

      <div className="LoginContent">
        
        <h1 className="desc-text-login">
          Don't have an account? <Link to="/register">Register</Link>
        </h1>

        <form noValidate onSubmit={onSubmit}>
          <div className="form-box">
            <TextField
              fullWidth
              id="filled-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email || errors.emailnotfound}
              helperText={errors.email || errors.emailnotfound}
              id="email"
              type="email"
             
            />
          </div>

          <div className="form-box">
            <TextField
              fullWidth
              id="filled-basic"
              label="Password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              type="password"
              error = {errors.password || errors.passwordincorrect}
              helperText={errors.password || errors.passwordincorrect}
            />
          </div>

          <div className="button">
            <Button fullWidth
          size="large" type="submit" variant="contained">
              Login
            </Button>
          </div>
        </form>

        <h1 className="desc-text-login">
          <Link variant="subtitle2" to="/forgotpassword" underline="hover">
            Forgot password?
          </Link>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);

/*



  <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>




            
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