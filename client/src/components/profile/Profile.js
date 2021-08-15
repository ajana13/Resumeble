import React from 'react';
import ReactDOM from "react-dom"
import { connect, ReactReduxContext } from 'react-redux'
import Experience from './Experience'
import Header from './ProfileHeader'
import ExampleCard from './ExampleCard'
import ContactInfoCard from './ContactInfoCard'
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: '#343131',
      
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const Profile = ({ auth }) => {

    const classes = useStyles();

    return (
        <div className={classes.root} >
            
  {/* 
  This is the code for the layout of the profile page, we use grid and box components to lay out
  the imported components into the page. The Grid component is made into a column style so that is why everything 
  is seperated down. Also Grid items have a size of xs ={12} which means they take up the whole row.  
  */}

  <Box  pt={12}>
      <Grid container spacing={3}
      direction="column"
      
      alignItems="center">
        <Grid item xs = {12}>
        {/*This is the profile Header that is imported at the top of this document*/}
        <Header/>
        </Grid>
        <Grid item xs>
          {/*This is the Example Card , currently the projects card that is imported at the top of this document*/}
          <ExampleCard/>
        </Grid>
        <Grid item xs>
          {/*This is the Contact Info Card, currently the projects card that is imported at the top of this document*/}
          <ContactInfoCard/>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>Education box coming soon</Paper>
        </Grid>
      </Grid>
      </Box>
    </div>
        
    );
}


Profile.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(Profile);