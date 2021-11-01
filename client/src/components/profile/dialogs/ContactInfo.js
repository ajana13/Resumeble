import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 800,
        maxWidth: 800,
      },
      edit: {
        marginLeft: 'auto',
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
      },
    dialog: {
        margin: theme.spacing(1),
        maxWidth: 800,
    },
}));

const ContactInfoDialog = (props, disabled) => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const [contactValues, setContactValues] = React.useState({
        firstName: '',
        lastName: '',
        address: '',
        secondAddress: '',
        city: '',
        state: '',
        zipCode: '',
        email: '',
        primaryPhone: '',
    })
    

    var values = {...contactValues};
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        let idName = event.target.id
        values[idName] = event.target.value

        //console.log("id: " + idName + ": " + values[idName])
    };
    
    //saves the value written in multiline to the card on profile
    const saveValue = (event) => {
        setContactValues(values);
        setOpen(false);
    };

return(
    <div className="ContactInfoDialog">

    <IconButton className={classes.edit} onClick={handleClickOpen} >
    <CreateIcon />
    </IconButton>

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
            <form className={classes.dialog} noValidate autoComplete="off" onChange={handleChange}>
                <TextField
                    id="firstName" 
                    label="First Name" 
                    variant="outlined"
                    className={classes.form}
                    defaultValue={values.firstName}
                    inputProps={{
                        style: {
                          padding: 10
                        }
                     }}
                    />
                <TextField
                    id="lastName" 
                    label="Last Name" 
                    variant="outlined" 
                    className={classes.form}
                    defaultValue={values.lastName}
                    inputProps={{
                        style: {
                          padding: 10
                        }
                     }}
                    />
                    <br/>
                <TextField
                    id="address" 
                    label="Address" 
                    variant="outlined" 
                    className={classes.form}
                    defaultValue={values.address}
                    inputProps={{
                        style: {
                          padding: 10
                        }
                     }}
                />
                <br/>
                <TextField
                    id="secondAddress" 
                    label="Second Address" 
                    variant="outlined" 
                    className={classes.form}
                    defaultValue={values.secondAddress}
                    inputProps={{
                        style: {
                          padding: 10
                        }
                     }}
                />
                <br/>
                <TextField
                    id="city" 
                    label="City" 
                    variant="outlined" 
                    className={classes.form}
                    defaultValue={values.city}
                    inputProps={{
                        style: {
                          padding: 10
                        }
                     }}
                />
                <TextField
                    id="state" 
                    label="State" 
                    variant="outlined" 
                    className={classes.form}
                    defaultValue={values.state}
                    inputProps={{
                        style: {
                          padding: 10
                        }
                     }}
                />
                <TextField
                    id="zipCode" 
                    label="Zip Code" 
                    variant="outlined" 
                    className={classes.form}
                    defaultValue={values.zipCode} 
                    inputProps={{
                        style: {
                          padding: 10
                        }
                     }}
                />
                <TextField
                    id="email"
                    label="Email" 
                    variant="outlined" 
                    className={classes.form}
                    defaultValue={values.email}
                    inputProps={{
                        style: {
                          padding: 10
                        }
                     }}
                />
                <TextField
                    id="primaryPhone" 
                    label="Primary Phone" 
                    variant="outlined" 
                    className={classes.form}
                    defaultValue={values.primaryPhone}
                    inputProps={{
                        style: {
                          padding: 10
                        }
                     }}
                />
                </form>
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
    </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(ContactInfoDialog);