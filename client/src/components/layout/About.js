import React from "react"
//import ReactDOM from 'react-dom';
import { connect } from "react-redux";
//import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


//const express = require('express');

//const router = express.Router();
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

function About({ auth, history }) {

    if (auth.isAuthenticated) {
        history.push('/dashboard');
    }
    return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
                <div className="col s12 center-align">
                <p className="flow-text grey-text text-darken-1">
                        This is the About Page
                    </p>
                    <h4>
                        <b>About us</b>
                    </h4>
                    <p> We strive to make the job and internship application process easier and more effiicent than ever.<br />
                        We want everyone to be able to create resumes tailored to specific job descriptions using ATS keywords provided by an AI agent.
                    </p>
                </div>
            </div>
        </div>
    );
}

About.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});


export default connect(mapStateToProps)(About);
