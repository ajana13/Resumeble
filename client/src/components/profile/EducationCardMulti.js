import React from "react";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import EducationDialog from './dialogs/EducationMulti';
import IconButton from '@material-ui/core/IconButton';

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

const EducationCard = ({ auth }) => {

    const classes = useStyles();

    const [educationValues, setEducationValues] = React.useState({
        education: '',
        school: '',
        dateStart: '',
        dateEnd: '',
    });
  
    return (
      <>
      {/*code for project card that is displayed on profile*/}
      <Card className={classes.root}>
      <CardHeader
        title="Education"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton className={classes.edit}>
          <EducationDialog {...educationValues}/>
        </IconButton>
      </CardActions>
    </Card>
    </>
    //Later I have to make it so when we press save we send the value to the backend, and move the onchange function
    );
}

EducationCard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(EducationCard);
