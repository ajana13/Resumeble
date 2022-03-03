import React from "react";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import Wave from "react-wavify";
import { View, StyleSheet } from "react";


import "./Home.css";
import LinkedIn from "../assets/linkedIn.svg";
import Website from "../assets/website.svg";
import Location from "../assets/location.svg";
import Email from "../assets/mail.svg";
import Phone from "../assets/phone.svg";
import GitHub from "../assets/github.svg";
import Education from "../assets/github.svg";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ExperienceCard from "./Cards/ExperienceCard.js";
import EducationCard from "./Cards/EducationCard.js";
import SkillsCard from "./Cards/SkillsCard.js";
import ProjectsCard from "./Cards/ProjectsCard.js";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Slider from 'react-slick';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useState } from "react";




export default function Home({auth}) {


    const NextArrow = ({ onClick }) => {
        return (
          <div onClick={onClick}>
            <BsFillArrowRightCircleFill/>
          </div>
        );
      };
    
      const PrevArrow = ({ onClick }) => {
        return (
          <div  onClick={onClick}>
             <BsFillArrowLeftCircleFill/>
          </div>
        );
      };

      const settings ={
      dots: true,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      NextArrow: <NextArrow/>,
      PrevArrow: <PrevArrow/>,
    };


  return (
    <div className="Home" id="Home">
      <div className="header-profile">
        <Wave
          fill="#FA7268"
          paused={false}
          options={{
            height: 30,
            amplitatude: 50,
            speed: 0.2,
            points: 4,
          }}
        />

        <div className="wave-overlap3">
          <Wave
            fill="#e34c67"
            paused={false}
            options={{
              height: 50,
              amplitatude: 40,
              speed: 0.1,
              points: 4,
            }}
          />
        </div>

        <div className="wave-overlap4">
          <Wave
            fill="#C62368"
            paused={false}
            options={{
              height: 60,
              amplitatude: 40,
              speed: 0.1,
              points: 4,
            }}
          />
        </div>
      </div>

      <h1 className="text-header">Profile Builder</h1>

      <div className="HomeContent">
        <div className="Profile-Component">
          <div className="Profile-Card">
            <div className="profile-picture">
              <div className="profile-picture-background"></div>
            </div>

            <h1 className="text-name">Herlin Rijo</h1>

            <div className="Project-Card-Icons">
              <div className="Icons">
                <img src={Email} alt="Email" />
                <h1 className="text-sub">hrijo@umass.edu</h1>
              </div>
              <div className="Icons">
                <img src={LinkedIn} alt="LinkedIn" />
                <h1 className="text-sub">LinkedIn.com/Herlin</h1>
              </div>
              <div className="Icons">
                <img src={Website} alt="LinkedIn" />
                <h1 className="text-sub">herlinjrijo.com</h1>
              </div>
              <div className="Icons">
                <img src={Location} alt="LinkedIn" />
                <h1 className="text-sub">Amherst, MA</h1>
              </div>
              <div className="Icons">
                <img src={Phone} alt="LinkedIn" />
                <h1 className="text-sub">774-823-0167</h1>
              </div>
              <div className="Icons">
                <img src={GitHub} alt="LinkedIn" />
                <h1 className="text-sub">Github.com/HerlinR</h1>
              </div>
            </div>
          </div>
          <div className="Edit-Button">
            <Button variant="contained" endIcon={<EditIcon />}>
              Edit
            </Button>
          </div>
        </div>
         
        <div className="Work-History">
           <Slider {...settings}>
           <div className="item">
            <div className="Work-Component">
              <div className="Work-Header">
                <h1 className="Work-History-Title">Work History</h1>
                <IconButton color="primary" aria-label="share">
                  <AddCircleIcon color="white" />
                </IconButton>
              </div>
              <ExperienceCard />
              <ExperienceCard />
              <ExperienceCard />
              <ExperienceCard />
            </div>
            </div>
  
            <div className="item">
            <div className="Education-Component">
              <div className="Education-Header">
                <h1 className="Education-History-Title">Education</h1>
                <IconButton color="primary" aria-label="share">
                  <AddCircleIcon color="white" />
                </IconButton>
              </div>
              <EducationCard />
              <EducationCard />
            </div>
             </div>
       

             <div className="item">
            <div className="Education-Component">
              <div className="Education-Header">
                <h1 className="Education-History-Title">Skills</h1>
                <IconButton color="primary" aria-label="share">
                  <AddCircleIcon color="white" />
                </IconButton>
              </div>
              <SkillsCard />
              <SkillsCard />
            </div>
            </div>

            <div className="item">
            <div className="Education-Component">
              <div className="Education-Header">
                <h1 className="Education-History-Title">Projects</h1>
                <IconButton color="primary" aria-label="share">
                  <AddCircleIcon color="white" />
                </IconButton>
              </div>
              <ProjectsCard />
              <ProjectsCard />
            </div>
            </div>
            </Slider>
          </div>
         
      </div>

      <div className="footer-profile">
        <Wave
          className="wave"
          fill="#FA7268"
          paused={false}
          options={{
            height: 60,
            amplitatude: 40,
            speed: 0.2,
            points: 4,
          }}
        />

        <div className="wave-overlap">
          <Wave
            className="wave"
            fill="#e34c67"
            paused={false}
            options={{
              height: 90,
              amplitatude: 40,
              speed: 0.1,
              points: 4,
            }}
          />
        </div>

        <div className="wave-overlap">
          <Wave
            className="wave"
            fill="#C62368"
            paused={false}
            options={{
              height: 110,
              amplitatude: 40,
              speed: 0.1,
              points: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/*
    <video src= {heroVideo} autoPlay loop muted/>
   <div className="video">
                    <ReactPlayer
                        url={heroVideo}
                        paused
                        loop
                        muted
                        playbackRate={1}
                        width='100%'
                        height='100%'
                    />
                </div>

          <Wave className="wave"
                        fill=''
                        paused={false}
                        options={{
                            height: 70,
                            amplitatude: 40,
                            speed: 0.3,
                            points: 4
                        }}
                    />




                       <Card sx={{ minWidth: 250 }} >
      <CardContent>
       
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
*/
