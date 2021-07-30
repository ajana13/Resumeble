import React, { useState } from "react";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import NoteCard from './note'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CreateIcon from '@material-ui/icons/Create';
import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Container from '@material-ui/core/Container';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid';


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

const ProfileHeader = ({ auth }) => {
    const classes = useStyles();

    //set open is for the first diaglogue box that opens
    const [open, setOpen] = React.useState(false);
    //openNote is for when a new Note is to be created
    const [openNote, setOpenNote] = React.useState(false);

    //values for Projects card
    //value is the value for the multilinebox
    //about value is the value for the box thats presented on the profile
    const [value, setValue] = React.useState('Enter info');
    const [aboutValue, setAboutValue] = React.useState('Enter info');


    //Values for addding a new note
    const [newNoteTitleValue, setNewNoteTitleValue] = React.useState('');
    const [newNoteSubtitle, setNewNoteSubtitleValue] = React.useState('');


    //Note array
    const [notes, setNotes] = React.useState([
    ])

    //Note Object
    const [note, setNote] = React.useState({
      note:{ title: '',
      subtitle: '',
    }
  });
    

  //opening and closing functions for intial dialogue box
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
    //opening and closing functions for new note dialogue box when clicking the add button
    //in the first dialogue box 
     const createNewNote = () => {
        setOpenNote(true);
      };
  
      const handleCloseTwo = () => {
        setOpenNote(false);
      };
      
    
      

     //saves the value written in multiline to the card on profile
      const saveValue = (event) => {
        setAboutValue(value);
        setOpen(false);
      };

    //This function is called when creating a new note and the title box is wirtten in, the value is saved here
    const handleChangeNewTitle = (event) => {
      setNewNoteTitleValue(event.target.value);
      
    };
//This function is called when creating a new note and the subTitle box is wirtten in, the value is saved here
    const handleChangeNewSubtitle = (event) => {
      setNewNoteSubtitleValue(event.target.value);
      
    }

    //New Card Creation, when we press save to create a new note, we close the dialogue box by setting "OpenNote" 
    //to false, then we set the new title and new subtitle to the note object. Then the note object is added to the
    //Notes array which then is used to map new Note.js Objects into the dialogue card

    const saveNewCardValue = () => {
      setOpenNote(false);
      //console.log(newNoteTitleValue)
      //console.log(newNoteSubtitle)
      
      note.note.title = newNoteTitleValue;
      note.note.subtitle= newNoteSubtitle;

      console.log(note)
      setNotes([...notes, note]);
      console.log(notes)
    };



    return (
      
    

      <div>
    
      {/*code for project card that is displayed on profile*/}
      <Card className={classes.root}>
      <CardHeader
        title="Projects"
        //subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {aboutValue}
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing>
       
        <IconButton
          className={classes.edit}
          onClick={handleClickOpen}
        >
          <CreateIcon />
        </IconButton>
      </CardActions>
     
    </Card>

{/*code for the first dialogue box when opened*/}

    <Dialog
       open={open}
       onClose={handleClose}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description"
     >
       <DialogTitle id="alert-dialog-title">{"Projects"}</DialogTitle>
       <DialogContent>
         <DialogContentText id="alert-dialog-description">
          <Container>
            {/*Here we map the array into not eobjects inside the dialogue box for ech note object in the array*/}
            <Grid container spacing={3}>
          {notes.map(note => <Grid item xs={12} ><NoteCard note={note} /> </Grid>)}
           <Grid item xs= {12} > <IconButton  onClick={createNewNote} ><AddCircleIcon/></IconButton> </Grid>
        </Grid>
        </Container>
         </DialogContentText>
       </DialogContent>
       <DialogActions>
         <Button onClick={saveValue} color="primary" className={classes.button} >
           Save
         </Button>
       </DialogActions>
     </Dialog>


    
{/*code for the dialogue box that pops open when we click the add icon inside the first dialogue box */}
     <Dialog
       open={openNote}
       onClose={handleCloseTwo}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description"
     >
       <DialogTitle id="alert-dialog-title">{"New Project"}</DialogTitle>
       <DialogContent>
         <DialogContentText id="alert-dialog-description">

         <Grid container spacing={3}>

         <Grid item xs={12}>
         <TextField
          id="outlined-multiline-flexible"
          label="Title"
          multiline
          rows={1}
          value={newNoteTitleValue}
          onChange={handleChangeNewTitle}
          variant="outlined"
          className={classes.textbox}
        />
        </Grid>
        
         <Grid item xs={12}>
         <TextField
          id="outlined-multiline-flexible"
          label="Subtitle"
          multiline
          rows={1}
          value={newNoteSubtitle}
          onChange={handleChangeNewSubtitle}
          
          variant="outlined"
          className={classes.textbox}
          stlye={{
          }}
        />
        </Grid>
       </Grid>

         </DialogContentText>
       </DialogContent>
       <DialogActions>
         <Button onClick={saveNewCardValue} color="primary" className={classes.button} >
           Save
         </Button>
       </DialogActions>
     </Dialog>
  
      </div>
    //Later I have to make it so when we press save we send the value to the backend, and move the onchange function
    );
}

ProfileHeader.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(ProfileHeader);
