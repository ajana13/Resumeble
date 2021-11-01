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

const EducationDialog = (props, disabled) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [educationValues, setEducationValues] = React.useState({
        education: '',
        school: '',
        dateStart: '',
        dateEnd: '',
    })
    

    var values = {...educationValues};
    
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
        setEducationValues(values);
        setOpen(false);
    };

return(
    <div className="EducationDialog">

    <IconButton className={classes.edit} onClick={handleClickOpen} >
    <CreateIcon />
    </IconButton>

    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
    >
    <DialogTitle id="alert-dialog-title">
    {"Enter Your Education Info"}
    </DialogTitle>
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
            <Container>
            {/*Here we map the array into note objects inside the dialogue box for each note object in the array*/}
            <Grid container spacing={3}>
            <form className={classes.dialog} noValidate autoComplete="off" onChange={handleChange}>
                <TextField
                    id="education" 
                    label="Education" 
                    variant="outlined"
                    defaultValue={values.education}
                    className={classes.form}
                    inputProps={{
                        style: {
                          padding: 10
                        }
                     }}
                    />
                    <br/>
                <TextField
                    id="school" 
                    label="School" 
                    variant="outlined" 
                    className={classes.form}
                    defaultValue={values.school}
                    inputProps={{
                        style: {
                          padding: 10
                        }
                     }}
                    />
                    <br/>
                <TextField
                    id="dateStart" 
                    label="Start Date" 
                    variant="outlined" 
                    className={classes.form}
                    defaultValue={values.dateStart}
                    inputProps={{
                        style: {
                          padding: 10
                        }
                     }}
                />
                <br/>
                <TextField
                    id="dateEnd" 
                    label="Date Finished" 
                    variant="outlined" 
                    className={classes.form}
                    defaultValue={values.dateEnd}
                    inputProps={{
                        style: {
                          padding: 10
                        }
                     }}
                />
                <br/>
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
)(EducationDialog);