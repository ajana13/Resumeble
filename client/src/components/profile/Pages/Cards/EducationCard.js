import React from 'react';
import './EducationCard.css';
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
    <div className="Education-card">
      <div className="Education-card-text">
        <div className="Education-Card-School">
        <h1 className="Education-card-title-text">UMass Amherst</h1>
          <div className="Edit-Buttons">
            <IconButton color="primary" aria-label="share">
              <EditIcon />
            </IconButton>
            <IconButton color="primary" aria-label="share">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div className="Education-Date-Text">
          <h1 >Masters Computer Science</h1>
          
        </div>
        <h1 className="Education-card-sub-text">
        November 2021 - Present
        </h1>
      </div>
    </div>
  );
}