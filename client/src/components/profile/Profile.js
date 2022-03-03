import React from 'react';
import ReactDOM from "react-dom";
import { connect, ReactReduxContext } from 'react-redux';
import PropTypes from "prop-types";
import Home from "./Pages/Home";
import './Profile.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
  },
});

function Profile({auth}) {
  
  return (

   <div>
    <ThemeProvider theme={theme}>
     <Home/>
     </ThemeProvider>
   </div>

  );
}


Profile.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(Profile);