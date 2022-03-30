import React, { useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import { connect, ReactReduxContext } from "react-redux";
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize.min.js";
import profile from "./images/herlin.jpg";
import parallaxOne from "./images/jungle.jpg";
import SkillsCard from "./models/skillsCard";
import ExperienceCard from "./models/experienceCard";
import EducationCard from "./models/educationCard";
import ProjectsCard from "./models/projectsCard";
import {useState} from 'react'
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const Profile = ({ auth }) => {

  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  const [pdfFile, setPdfFile]=useState(null);

  // pdf file error state
  const [pdfError, setPdfError]=useState('');


  // handle file onChange event
  const allowedFiles = ['application/pdf'];
  const handleFile = (e) =>{
    let selectedFile = e.target.files[0];
    // console.log(selectedFile.type);
    if(selectedFile){
      if(selectedFile&&allowedFiles.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend=(e)=>{
          setPdfError('');
          setPdfFile(e.target.result);
        }
      }
      else{
        setPdfError('Not a valid pdf: Please select only PDF');
        setPdfFile('');
      }
    }
    else{
      console.log('please select a PDF');
    }
  }

  useEffect(() => {
    // Init Tabs Materialize JS
    let fixed = document.querySelectorAll(".fixed-action-btn");
    M.FloatingActionButton.init(fixed, {
      direction: "left",
      hoverEnabled: false,
    });
  });

  useEffect(() => {
    // Init Tabs Materialize JS
    let modal = document.querySelectorAll(".modal");
    M.Modal.init(modal);
  });

  useEffect(() => {
    // Init Tabs Materialize JS
    let tabs = document.querySelectorAll(".tabs");
    M.Tabs.init(tabs);
  });

  useEffect(() => {
    // Init Tabs Materialize JS
    let parallax = document.querySelectorAll(".parallax");
    M.Parallax.init(parallax);
  });
  return (
    <div>
      <div id="index-banner" className="parallax-container">
        <div className="section no-pad-bot">
          <div className="container">
            <br></br>
            <h1 className="header center white-text">Profile</h1>
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
        <div style={{ marginTop: "-20rem" }} className="row">
          <div className="col s12">
            <div className="card horizontal">
            <div className="card-image">
                <img src={profile}  />
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <div className="row">


                  <div className="col s12">
                  <h4>Herlin Rijo</h4>
                     </div>
                  <div className="col s12">
                  <span class="card-title">Software Engineer </span>
                     </div>
                  <div className="col s12">
                  <h6 className="grey-text">
                    Phone:
                  </h6>
                  </div>
                  <div className="col s12">
                  <p>
                    774-823-0167
                  </p>
                  </div>
                  
                  <div className="col s12">
                  <h6 className="grey-text">
                    Email:
                  </h6>
                  </div>
                  <div className="col s12">
                  <p>
                    hrijo@umass.edu
                  </p>
                  </div>

                  <div className="col s12">
                  <h6 className="grey-text">
                    Adress:
                  </h6>
                  </div>
                  <div className="col s12">
                  <p>
                    151 CommonWealth Ave, Amherst MA
                  </p>
                  </div>

                  <div className="col s12">
                  <h6 className="grey-text">
                    Website:
                  </h6>
                  </div>
                  <div className="col s12">
                  <p>
                    www.hrijo.com
                  </p>
                  </div>

                  </div>
                </div>
                <div className="card-action">
                  <a  href="#">Edit Information</a>
                  <a  className="modal-trigger "
                href="#modal2">Upload Resume</a>
                </div>
              </div>
            </div>
          </div>

          <div className="col s12 " style={{ marginTop: "4rem" }}>
            <ul id="tabs-swipe-demo" class="tabs">
              <li className="tab col s3">
                <a class="active" href="#test-swipe-1">
                  Skills
                </a>
              </li>
              <li className="tab col s3">
                <a href="#test-swipe-2">Education</a>
              </li>
              <li className="tab col s3">
                <a href="#test-swipe-3">Work History</a>
              </li>
              <li className="tab col s3">
                <a href="#test-swipe-4">Projects</a>
              </li>
            </ul>

            <div id="test-swipe-1" className="col s12 white">
              <div className="row">
                <div
                  class="right-align"
                  style={{ marginRight: "2.2em", marginBottom: "2em" }}
                >
                  {" "}
                  <a className=" btn-floating btn-medium green">
                    <i className="material-icons">add</i>
                  </a>
                </div>
                <div className="col s12">
                  <SkillsCard />
                  <SkillsCard />
                  <SkillsCard />
                </div>
              </div>
            </div>

            <div id="test-swipe-2" className="col s12 white">
              <div className="row">
                <div
                  class="right-align"
                  style={{ marginRight: "2.2em", marginBottom: "2em" }}
                >
                  {" "}
                  <a className=" btn-floating btn-medium green">
                    <i className="material-icons">add</i>
                  </a>
                </div>
                <div className="col s12">
                  <EducationCard />
                  <EducationCard />
                  <EducationCard />
                </div>
              </div>
            </div>
            <div id="test-swipe-3" className="col s12 white">
              <div className="row">
                <div
                  class="right-align"
                  style={{ marginRight: "2.2em", marginBottom: "2em" }}
                >
                  {" "}
                  <a className=" btn-floating btn-medium green">
                    <i className="material-icons">add</i>
                  </a>
                </div>
                <div className="col s12">
                  <ExperienceCard />
                  <ExperienceCard />
                  <ExperienceCard />
                </div>
              </div>
            </div>
            <div id="test-swipe-4" className="col s12 white">
              <div className="row">
                <div
                  class="right-align"
                  style={{ marginRight: "2.2em", marginBottom: "2em" }}
                >
                  {" "}
                  <a className=" btn-floating btn-medium green">
                    <i className="material-icons">add</i>
                  </a>
                </div>
                <div className="col s12">
                  <ProjectsCard />
                  <ProjectsCard />
                  <ProjectsCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="modal2" className="modal">
    <div className="modal-content">
      <div>
      <h4>Upload Resume</h4>
      <p>This action is unreversable, click cancel to keep skill or delete to continue with removal</p>

  <form action="#">
    <div className="file-field input-field">
      <div className="btn">
        <span>File</span>
        <input style={{borderBottom:"1px solid rgb(0, 0, 0)"}}type="file"/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
  </form>



  <div className="container">

{/* Upload PDF */}
<form>

  <label><h5>Upload PDF</h5></label>
  <br></br>

  <input type='file' className="form-control"
  onChange={handleFile}></input>

  {/* we will display error message in case user select some file
  other than pdf */}
  {pdfError&&<span className='text-danger'>{pdfError}</span>}

</form>

{/* View PDF */}
<h5>View PDF</h5>
<div className="viewer">

  {/* render this if we have a pdf file */}
  {pdfFile&&(
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
      <Viewer fileUrl={pdfFile}
      plugins={[defaultLayoutPluginInstance]}></Viewer>
    </Worker>
  )}

  {/* render this if we have pdfFile state null   */}
  {!pdfFile&&<>No file is selected yet</>}

</div>

</div>





      </div>
    </div>
    <div className="modal-footer">
      <a href="#!" class="modal-close btn-flat">Cancel</a>
      <a href="#!" class="modal-close green white-text btn">Save</a>
    </div>
  </div>

    </div>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Profile);
