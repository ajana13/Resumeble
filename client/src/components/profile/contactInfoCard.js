import React from "react";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';
import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { mergeClasses } from "@material-ui/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 800,
    maxWidth: 800,

  },
  edit: {
    marginLeft: 'auto',
  },
  dialog: {
    margin: theme.spacing(1),
    //minWidth: 800,
    maxWidth: 800,
  },
  button: {
    backgroundColor: "#16ECDF"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  form: {
    size: '20',
    margin: theme.spacing(1),
  }
}));

const ProfileHeader = ({ auth }) => {
  const classes = useStyles();

  //set open is for the first diaglogue box that opens
  const [open, setOpen] = React.useState(false);

  const value = {
    firstName: '',
    lastName: '',
    address: '',
    secondAddress: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    primaryPhone: '',
}


const handleChange = (event) => {
  let idName = event.target.id
  
  value[idName] = event.target.value

};

const [contactValue, setNewValue] = React.useState('Enter Info');
    

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};


      

  //saves the value written in multiline to the card on profile
const saveValue = (event) => {
  setNewValue(
    React.createElement(
    "div",
      null, 
      <form className={classes.dialog} noValidate autoComplete="off">
          <TextField
            id="outlined-basic" 
            label="First Name" 
            variant="outlined"
            className={classes.form}
            value={value.firstName}

            />
          <TextField
            id="outlined-basic" 
            label="Last Name" 
            variant="outlined" 
            className={classes.form}
            value={value.lastName}  
            InputProps={{
              readOnly: true
            }}
            />
            <br/>
          <TextField
            id="outlined-basic" 
            label="Address" 
            variant="outlined" 
            className={classes.form}
            value={value.address}  
            InputProps={{
              readOnly: true
            }}
          />
          <br/>
          <TextField
            id="outlined-basic" 
            label="Second Address" 
            variant="outlined" 
            className={classes.form}
            value={value.secondAddress}  
            InputProps={{
              readOnly: true
            }}
          />
          <br/>
          <TextField
            id="outlined-basic" 
            label="City" 
            variant="outlined" 
            className={classes.form}
            value={value.city}  
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="outlined-basic" 
            label="State" 
            variant="outlined" 
            className={classes.form}
            value={value.state}  
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="outlined-basic" 
            label="Zip Code" 
            variant="outlined" 
            className={classes.form}
            value={value.zipCode}  
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="outlined-basic" 
            label="Email" 
            variant="outlined" 
            className={classes.form}
            value={value.email}  
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="outlined-basic" 
            label="Primary Phone" 
            variant="outlined" 
            className={classes.form}
            value={value.primaryPhone}
            InputProps={{
              readOnly: true
            }}
          />
        </form>
        )
    );
  setOpen(false);
  
};


  return (
    
    <div>
    {/*code for project card that is displayed on profile*/}
    <Card className={classes.root}>
    <CardHeader
      title="Contact Information"
      //subheader="September 14, 2016"
    />
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        {contactValue}
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

<>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">
            {"Enter Your Contact"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Container>
                {/*Here we map the array into note objects inside the dialogue box for each note object in the array*/}
                <Grid container spacing={3}>
                  {/*{notes.map(note => <Grid item xs={12} ><NoteCard note={note} /> </Grid>)} */}
                  <form
                    className={classes.dialog}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="firstName"
                      label="First Name"
                      variant="outlined"
                      className={classes.form}
                      onChange={(handleChange)}
                    />
                    <TextField
                      id="lastName"
                      label="Last Name"
                      variant="outlined"
                      className={classes.form}
                      onChange={(handleChange)}
                    />
                    <TextField
                      id="address"
                      label="Address"
                      variant="outlined"
                      className={classes.form}
                      onChange={(handleChange)}
                    />
                    <TextField
                      id="secondAddress"
                      label="Second Address"
                      variant="outlined"
                      className={classes.form}
                      onChange={(handleChange)}
                    />
                    <TextField
                      id="city"
                      label="City"
                      variant="outlined"
                      className={classes.form}
                      onChange={(handleChange)}
                    />
                    <TextField
                      id="state"
                      label="State"
                      variant="outlined"
                      className={classes.form}
                      onChange={(handleChange)}
                    />
                    <TextField
                      id="zipCode"
                      label="Zip Code"
                      variant="outlined"
                      className={classes.form}
                      onChange={(handleChange)}
                    />
                    <TextField
                      id="email"
                      label="Email"
                      variant="outlined"
                      className={classes.form}
                      onChange={(handleChange)}
                    />
                    <TextField
                      id="primaryPhone"
                      label="Primary Phone"
                      variant="outlined"
                      className={classes.form}
                      onChange={(handleChange)}
                    />
                  </form>

                  {/* <Grid item xs= {12} > <IconButton  onClick={createNewNote} ><AddCircleIcon/></IconButton> </Grid> */}
                </Grid>
              </Container>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={saveValue} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>

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
