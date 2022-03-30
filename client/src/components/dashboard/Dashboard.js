import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import parallaxOne from "./images/jungle.jpg";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";

const Dashboard = ({ auth, logoutUser }) => {
  const { name } = auth.user;

  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
  };

  useEffect(() => {
    // Init Tabs Materialize JS
    let parallax = document.querySelectorAll(".parallax");
    M.Parallax.init(parallax);
  });

  console.log(name);

  if (name !== undefined) {
    return (
      <div>
        <div id="index-banner" className="parallax-container">
          <div className="section no-pad-bot">
            <div className="container">
              <br></br>
              <h1 className="header center white-text">Dashboard</h1>
              <div className="row center">
                <h4 className="white-text">
                  <b>Hey there,</b> {name.split(" ")[0]}
                  <p className="flow-text white-text">
                    You are logged into a full-stack{" "}
                    <span style={{ fontFamily: "monospace" }}>Resume</span> App
                    👏
                  </p>
                </h4>
              </div>
              <div className="row center">
                <Link
                  to="/profile"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  className="btn btn-large waves-effect waves-light hoverable teal lighten-1 pulse "
                >
                  Start
                </Link>
              </div>
              <br></br>
            </div>
          </div>
          <div className="parallax">
            <img
              class="responsive-img"
              src={parallaxOne}
              alt="Unsplashed background img 1"
            />
          </div>
        </div>

        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col s12 m4">
                <div cclassName="icon-block">
                  <h2 className="center white-text">
                    <i className=" small material-icons">flash_on</i>
                  </h2>
                  <h5 className="center teal-text lighten-1">
                    Speeds up development
                  </h5>

                  <p className="light white-text">
                    We did most of the heavy lifting for you to provide a
                    default stylings that incorporate our custom components.
                    Additionally, we refined animations and transitions to
                    provide a smoother experience for developers.
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center white-text">
                    <i className="small material-icons">group</i>
                  </h2>
                  <h5 className="center teal-text lighten-1">
                    User Experience Focused
                  </h5>

                  <p class="light white-text">
                    By utilizing elements and principles of Material Design, we
                    were able to create a framework that incorporates components
                    and animations that provide more feedback to users.
                    Additionally, a single underlying responsive system across
                    all platforms allow for a more unified user experience.
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center white-text">
                    <i className=" small material-icons">settings</i>
                  </h2>
                  <h5 className="center teal-text lighten-1">
                    Easy to work with
                  </h5>

                  <p className="light white-text">
                    We have provided detailed documentation as well as specific
                    code examples to help new users get started. We are also
                    always open to feedback and can answer any questions a user
                    may have about Materialize.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);

/*
 */
