import React from "react"
//import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function ConfirmResetPasswordPage({ auth, history }) {

    if (auth.isAuthenticated) {
        history.push('/dashboard');
    }
    return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
                <div className="col s12 center-align">
                    <h4>
                        <b style={{color: "white"}}>You have reset your password</b>
                    </h4>
                    <p>
                        Return <Link to="/">Home</Link>
                    </p>
                    <p>
                    A reset link has been sent to your email. <b>You have 12 hours to activate your account.</b>
                    It can take up to 15 min to receive our email.
                    </p>
                </div>
            </div>
        </div>
    );
}

ConfirmResetPasswordPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});


export default connect(mapStateToProps)(ConfirmResetPasswordPage);
