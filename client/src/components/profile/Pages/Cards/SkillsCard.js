import React from 'react';
import './SkillsCard.css';
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SkillsCard() {
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
    <div className="Skills-card">
      <div className="Skills-card-text">
        <div className="Skills-Card-School">
        <h1 className="Skills-card-title-text">Java</h1>
          <div className="Edit-Buttons">
            <IconButton color="primary" aria-label="share">
              <EditIcon />
            </IconButton>
            <IconButton color="primary" aria-label="share">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div className="Skills-Date-Text">
          <h1 >Expert</h1>
          
        </div>
        <h1 className="Skills-card-sub-text">
        November 2021 - Present
        </h1>
      </div>
    </div>
  );
}