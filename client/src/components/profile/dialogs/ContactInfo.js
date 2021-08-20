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

const ContactInfoDialog = ({ auth }) => {

    const classes = useStyles();

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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleChange = (event) => {
        let idName = event.target.id
        value[idName] = event.target.value
        console.log("id: " + idName + " " + value[idName])
    };
    
    const [contactValue, setContactValue] = React.useState('Enter Info');
    
    const ContactInfoForm = (value,disabled) => {
        let isDisabled = false;
        isDisabled = disabled;

        return(

                <form className={classes.dialog} noValidate autoComplete="off" onChange={handleChange}>
                <TextField
                    id="firstName" 
                    disabled={ (disabled===true) ? isDisabled===true : false}
                    label="First Name" 
                    variant="outlined"
                    className={classes.form}
                    value={value.firstName}
                    
                    />
                <TextField
                    id="lastName" 
                    label="Last Name" 
                    disabled={ (disabled===true) ? isDisabled===true : false}
                    variant="outlined" 
                    className={classes.form}
                    value={value.lastName}

                    />
                    <br/>
                <TextField
                    id="address" 
                    label="Address" 
                    disabled={ (disabled===true) ? isDisabled===true : false}
                    variant="outlined" 
                    className={classes.form}
                    value={value.address}
                    
                />
                <br/>
                <TextField
                    id="secondAddress" 
                    label="Second Address" 
                    disabled={ (disabled===true) ? isDisabled===true : false}
                    variant="outlined" 
                    className={classes.form}
                    value={value.secondAddress}
                    
                />
                <br/>
                <TextField
                    id="city" 
                    label="City" 
                    disabled={ (disabled===true) ? isDisabled===true : false}
                    variant="outlined" 
                    className={classes.form}
                    value={value.city}
                    
                />
                <TextField
                    id="state" 
                    label="State" 
                    disabled={ (disabled===true) ? isDisabled===true : false}
                    variant="outlined" 
                    className={classes.form}
                    value={value.state}
                    
                />
                <TextField
                    id="zipCode" 
                    label="Zip Code" 
                    disabled={ (disabled===true) ? isDisabled===true : false}
                    variant="outlined" 
                    className={classes.form}
                    value={value.zipCode} 
                    
                />
                <TextField
                    id="email"
                    label="Email" 
                    disabled={ (disabled===true) ? isDisabled===true : false}
                    variant="outlined" 
                    className={classes.form}
                    value={value.email}
                   
                />
                <TextField
                    id="primaryPhone" 
                    label="Primary Phone" 
                    disabled={ (disabled===true) ? isDisabled===true : false}
                    variant="outlined" 
                    className={classes.form}
                    value={value.primaryPhone}
                    
                />
                </form>
            )
     }

    //saves the value written in multiline to the card on profile
    const saveValue = (event) => {
        setContactValue(ContactInfoForm(value, true));
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
                <ContactInfoForm />
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