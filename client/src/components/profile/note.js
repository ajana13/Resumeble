import React, { useState } from "react";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import {IconButton} from  '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({

    root: {
      minWidth: 800,
      maxWidth: 800,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    edit: {
      marginLeft: 'auto',
    },
    dialog: {
      minWidth: 800,
      maxWidth: 800,
    },
    textbox: {
      minWidth: 500,
      maxWidth: 500,
    },
    button: {
      backgroundColor: "#16ECDF"
    },

}));


const NoteCard= ({  note }) => {

    const classes = useStyles();

    //variables for dialogue box  value, opening and closingneed to finish
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('Enter info');
    const [aboutValue, setAboutValue] = React.useState('Enter info');


   //functions for handling dialogue box for editing (nned to finish)
    const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      const handleChange = (event) => {
        setValue(event.target.value);
      };
     
      const saveValue = (event) => {
        setAboutValue(value);
        setOpen(false);
      };



    return (
     //code for the note card presented in the first dialogue box, and passing in the note title and subtitle
     // props recieved from parent component
        <div>
       <Card>
           <CardHeader  action={
               <div>
                   <IconButton>
                       <CreateIcon/>
                   </IconButton>
                   <IconButton>
                       <DeleteIcon/>
                   </IconButton>
                </div>
                } 
               title= {note.note.title}
               subheader= {note.note.subtitle}
                
                />
       </Card>
  
  {/*code for dialogue box to edit note*/}
       <Dialog
       open={open}
       onClose={handleClose}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description"
     >
       <DialogTitle id="alert-dialog-title">{"About Me"}</DialogTitle>
       <DialogContent>
         <DialogContentText id="alert-dialog-description">



         <TextField
          id="outlined-multiline-flexible"
          label="Enter Info"
          multiline
          rows={10}
          value={value}
          onChange={handleChange}
          variant="outlined"
          className={classes.textbox}
        />
         </DialogContentText>
       </DialogContent>
       <DialogActions>
         <Button onClick={saveValue} color="primary" className={classes.button} >
           Save
         </Button>
       </DialogActions>
     </Dialog>
  
    
        </div>
      //Later I have to make it so when we press save we send the value to the backend, and move the onchange function
      );
  }
  
  NoteCard.propTypes = {
      auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
      auth: state.auth
  });
  
  export default connect(
      mapStateToProps,
  )(NoteCard);
  


