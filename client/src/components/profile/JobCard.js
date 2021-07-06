import React from 'react';
import { connect } from 'react-redux';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PropTypes from "prop-types";
import {logoutUser} from "../../redux/actions/authActions";

const JobCard = ({ auth }) => {
    return (
        <div>
            <div className="icon">
                <a className="text-info" href="#">
                    Show more&nbsp;<KeyboardArrowDownIcon size={10} />
                </a>
            </div>
        </div>
    );
}

JobCard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(JobCard);
