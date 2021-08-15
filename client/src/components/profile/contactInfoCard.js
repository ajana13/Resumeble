import React from "react";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import CardHeader from '@material-ui/core/CardHeader';
import ContactInfoDiaglog from './dialogs/ContactInfo';

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
  }
}));

const ProfileHeader = ({ auth }) => {
  const classes = useStyles();


const [contactValue, setNewValue] = React.useState('Enter Info');
  
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
        {ContactInfoDiaglog.ContactInfoForm}
      </Typography>
    </CardContent>
    
    <CardActions disableSpacing>
      <ContactInfoDiaglog className={classes.edit}>
        <CreateIcon />
      </ContactInfoDiaglog>
    </CardActions>
  </Card>
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
