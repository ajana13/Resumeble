
import { connect } from 'react-redux';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize.min.js";
import React, { useEffect, Fragment } from "react";


const EducationCard = ({ auth }) => {

    useEffect(() => {
        // Init Tabs Materialize JS
        let fixed = document.querySelectorAll(".fixed-action-btn");
        M.FloatingActionButton.init(fixed, {
          direction: 'left',
          hoverEnabled: false
        });
      });

      

    return (
        
        <div className="card">
        <div
          className="fixed-action-btn  click-to-toggle  direction-left active"
          style={{ position: "absolute", top: "10px" }}
        >
          <a className="btn-floating btn-medium red">
            <i className="material-icons">menu</i>
          </a>
          <ul>
            <li>
              <a
                className="btn-floating  btn-small green"
                style={{
                  opacity: "0",
                  transform:
                    "scale(0.4) translateY(0px) translateX(40px)",
                }}
              >
                <i className="material-icons">create</i>
              </a>
            </li>

            <li>
              <a
                className="btn-floating btn-small blue"
                style={{
                  opacity: "0",
                  transform:
                    "scale(0.4) translateY(0px) translateX(40px)",
                }}
              >
                <i className="material-icons">delete</i>
              </a>
            </li>
          </ul>
        </div>

        <div class="card-content">
          <span class="card-title">UMass Amherst</span>
          <p>Years of Experience</p>

          <p>
            I am a very simple card. I am good at containing small
            bits of information. I am convenient because I require
            little markup to use effectively.
          </p>
        </div>
      </div>
   
        
    );
}

EducationCard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(EducationCard);
