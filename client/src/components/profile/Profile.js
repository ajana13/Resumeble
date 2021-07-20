import React from 'react';
import { connect } from 'react-redux'
import Experience from './Experience'
import PropTypes from "prop-types";

const Profile = ({ auth }) => {
    return (
        <div id="profile-top" className="card mb-3">
            <button variant="contained" color="primary">
            Primary
            </button>
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