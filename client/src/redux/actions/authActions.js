import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/auth/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/auth/login", userData)
    .then(res => {
        // Save to localStorage

        // Set token to localStorage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};


export const sendResetPasswordLink = (email, history) => dispatch => {
  axios
    .post("/auth/password_reset", email)
    .then(res => {
        history.push("./confirmforgotpassword")
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
  );
}

export const resetForgottenPassword = (userData, history) => dispatch => {
  axios
    .post("/auth/reset_forgotten_password", userData)
      .then(res => {
          history.push("./confirmforgotpassword")
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

/*
const postLogin = (user) => http.post("/auth/login", user);
const sendResetPasswordLink = (email) => http.post("/auth/login/forgot", { email });
const resetPassword = (password, token) => http.post(`/auth/login/reset/${token}`, { password });
const postLogout = () => http.post("/auth/logout");
const postRegister = (user) => http.post("/auth/register", user);
const getConfirmation = (token) => http.get(`/auth/confirmation/${token}`);
const resendConfirmation = (email) => http.post("/auth/resend", { email });
const resetRegister = (email) => http.post("/auth/register/reset", { email });
const getUser = () => http.get("/user");
*/
/*
export const attemptResetPassword = (tokenData, history)  => dispatch => {
  const {token, password} = tokenData;
  axios.post(`/auth/login/reset/${token}`, { password })
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const attemptGetConfirmation = (token, history) => dispatch => {
  axios
    .get(`/auth/confirmation/${token}`)
    .then(res => history.push("/login"));
}

export const attemptResendConfirmation = (email, history) => dispatch => {
  axios
    .post("/auth/resend", { email })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      history.push("/register");
    });
}
export const attemptResetRegister = (email, history) => dispatch => {
  axios
    .post("/auth/register/reset", { email })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      history.push("/register");
    });
}
*/