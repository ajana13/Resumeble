import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";

function Navbar({ auth, logoutUser }) {
    const onLogoutClick = e => {
        e.preventDefault();
        logoutUser();
    };

    const { isAuthenticated } = auth;

    const loggedInNav = () => (
        <div className="navbar-fixed">
            <nav className="z-depth-0">
                <div className="nav-wrapper white">
                    <Link
                        to="/dashboard"
                        style={{
                            fontFamily: "monospace"
                        }}
                        className="col s5 brand-logo black-text">
                        <i className="material-icons">code</i>
                        Landing
                    </Link>
                    <button
                        style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        onClick={onLogoutClick}
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );

    const loggedOutNav = () => (
        <div className="navbar-fixed">
            <nav className="z-depth-0">
                <div className="nav-wrapper white">
                    <Link
                        to="/"
                        style={{
                            fontFamily: "monospace"
                        }}
                        className="col s5 brand-logo black-text">
                        <i className="material-icons">code</i>
                        Landing
                    </Link>
                    <Link
                        to="/login"
                        style={{
                            fontFamily: "monospace"
                        }}
                        className="col s5 brand-logo black-text">
                        <i className="material-icons">code</i>
                        Login
                    </Link>
                    <Link
                        to="/register"
                        style={{
                            fontFamily: "monospace"
                        }}
                        className="col s5 brand-logo black-text">
                        <i className="material-icons">code</i>
                        Register
                    </Link>
                </div>
            </nav>
        </div>
    );

    return (
        <>
            {isAuthenticated ? loggedInNav() : loggedOutNav()}
        </>
    );
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);