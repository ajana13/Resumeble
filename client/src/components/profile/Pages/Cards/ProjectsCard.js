import React from 'react';
import './ProjectsCard.css';
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EducationCard() {
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
    <div className="Projects-card">
      <div className="Projects-card-text">
        <div className="Projects-Card-School">
        <h1 className="Projects-card-title-text">Ethisim</h1>
          <div className="Edit-Buttons">
            <IconButton color="primary" aria-label="share">
              <EditIcon />
            </IconButton>
            <IconButton color="primary" aria-label="share">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div className="Projects-Date-Text">
          <h1 >November 2021 - Present</h1>
          
        </div>
        <h1 className="Projects-card-sub-text">
        Web Application That Serves as An ethical Simulator
        </h1>
      </div>
    </div>
  );
}