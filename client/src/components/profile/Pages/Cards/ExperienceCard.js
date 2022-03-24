import React from "react";
import "./ExperienceCard.css";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ExperienceCard() {
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
    <div className="Experience-card">
      <div className="Experience-card-text">
        <div className="Work-Card-Job">
        <h1 className="Experience-card-title-text">Front End Developer</h1>
          <div className="Edit-Buttons">
            <IconButton color="primary" aria-label="share">
              <EditIcon />
            </IconButton>
            <IconButton color="primary" aria-label="share">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div className="Experience-Date-Text">
          <h1 className="h1">Google</h1>
          <h1 className="h1">{bull}</h1>
          <h1 className="h1">November 2021 - Present</h1>
        </div>
        <h1 className="Experience-card-sub-text">
          Helped Develop Googles UI Interface
        </h1>
      </div>
    </div>
  );
}
