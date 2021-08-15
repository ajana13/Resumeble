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

const useStyles = makeStyles((theme) => ({
  
    large: {
        width: theme.spacing(40),
        height: theme.spacing(40),
      },
      title:{
        color:'white',
        alignItems:'center'
      },
      input: {
        display: 'none',
      },
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
    //This variable is used to check wether the profile image icon is being hovered over
    const [isHovered, setHover] = useState(false);
    //The open variable is being used to handle the opening and closing of the dialogue pop up box
    const [open, setOpen] = React.useState(false);
    // the profileImg variable is being used to store the icon image
    const [profileImg, setImg] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    //value holds the string of characters that are currently in the textline box inside the dialogue pop up, it is 
    //atomatically updated when the user writes in it
    const [value, setValue] = React.useState('Enter info');
    //aboutValue is the text we see on the card without the dialogue box being open. This is the information 
    //displyed. This variable is updated only when the user presses save
    const [aboutValue, setAboutValue] = React.useState('Enter info');
    //name stores the users name
    const { name } = auth.user;



    //Image handler is responsible for reading the image uploaded as a file
    const  imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
           setImg(reader.result)
          }
        }
        reader.readAsDataURL(e.target.files[0])
      };

  
      //handle click open is the fucntion used to set the variable 'Open' to true so that the dialogue
      //box is displayed
      const handleClickOpen = () => {
        setOpen(true);
      };
    


      //handle close is the fucntion used to set the variable 'Open' to false so that the dialogue
      //box is not displayed
      const handleClose = () => {
        setOpen(false);
      };


      //handle change, changes the value of "value" when the user types in the textline box / 
      //when the value inside the box changes
      const handleChange = (event) => {
        setValue(event.target.value);
      };
     
      // save vlaue function is called when the user presses the save button, it sets the "aboutValue" variable 
      //to the current value fo the vaiable "value" which i mentioned before. "aboutValue" is the value displayed
      //on the profile card
      const saveValue = (event) => {
        setAboutValue(value);
        setOpen(false);
      };
    return (
      
    

      <div>

       {/* inside this div  we create the image icone and set the hover function, when we hover
       we display a button, the camera button that is shown when hovered allows the user to upload
       and image from their computer */}

        <div 
        style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        }}>
          <IconButton onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <Avatar alt="Remy Sharp" src= {profileImg} className={classes.large}  />
            {isHovered && (

        <Button
          size="small"
          style={{
            position: "absolute",
            alignItems: "center",
            marginTop: 100,
          }}
          variant="contained"
         
        >
            <input className={classes.input} type="file" accept="image/*" name="image-upload" id="icon-button-file" onChange={imageHandler} />
            <label htmlFor="icon-button-file">
             
             <IconButton  color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
            </label>
        </Button>

      )}
            </IconButton>

      </div>

       {/* Inside this div we create the name displayed  under the profile icon */}
      <div  style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 50,
          
        }}>
            <Typography  className={classes.title} variant="h3"> {name.split(" ")[0]} </Typography>
      </div>
       
{/* This is the code for the "About Me" card displayed on the profile page */}

      <Card className={classes.root}>
      <CardHeader
        title="About Me"
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

{/* This is the code for the dialogue box pop-up */}

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

ProfileHeader.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(ProfileHeader);




