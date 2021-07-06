import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ auth, history }) => {

    if (auth.isAuthenticated) {
        history.push('/dashboard');
    }

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Build</b> a resume with {" "}
              <span style={{ fontFamily: "monospace" }}>Resumeble</span>
            </h4>
            <p className="flow-text grey-text text-darken-1">
                Timothy Nguyen, Nam Phan, Herlin Rijo
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}

Landing.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
