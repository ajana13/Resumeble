import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import './DashBoard.css'
import Button from "@mui/material/Button";

const Dashboard = ({ auth, logoutUser }) => {
  const { name } = auth.user;

  const onLogoutClick = e => {
    e.preventDefault();
    logoutUser();
  };


  if(name !== undefined) {
    return (
      <div>
        <div className='DashBoard'>
          
          
                <h1 className='dash-text-name'>Hey there, {name.split(" ")[0]} </h1> 
                <h1  className='dash-text-sub'>
                  You are logged into a full-stack{" "}
                  <span style={{ fontFamily: "monospace" }}>Resume</span> app 👏
                </h1>
           
             
              </div>
        </div>
    );
  } 
};

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);
