import React from 'react';
import { connect } from 'react-redux'
import JobCard from './JobCard'
import PropTypes from "prop-types";
// import Education from './education'
// import Volunteer from './volunteer'

const Experience = ({ auth }) => {
    return (
        <div id="profile-top" className="card mb-3">
            <JobCard />
            <hr />
        </div>
    );
}

Experience.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(Experience);