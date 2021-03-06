import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import "./Navbar.css";

import {
    AppBar,
    Button,
    makeStyles,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    Link,
    MenuItem,
} from "@material-ui/core";
import Dashboard from '../dashboard/Dashboard';
import Profile from '../profile/Profile';
import MenuIcon from "@material-ui/icons/Menu";
import {  Link as RouterLink  } from "react-router-dom";

import { logoutUser } from "../../redux/actions/authActions";

const headersDataLogout = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Login",
        href: "/login",
    },
    {
        label: "Register",
        href: "/register",
    },
    {
        label: "About",
        href: "/about",
    },
]


const useStyles = makeStyles(() => ({
    header: {
        // backgroundColor: "#400CCC",
        background: 'white',
        boxShadow: 'none',
        paddingRight: "79px",
        paddingLeft: "118px",
        "@media (max-width: 900px)": {
            paddingLeft: 0,
        },

    },
    logo: {
        fontFamily: "PT Sans, sans-serif",
        fontWeight: 600,
        color: "black",
        textAlign: "left",
    },
    menuButton: {
        fontFamily: "PT Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
        color: "black",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        color: "black",
    },
    drawerContainer: {
        padding: "30px 30px",
    },
}));

function Navbar({ auth, logoutUser }) {
    const {header, logo, menuButton, toolbar, drawerContainer} = useStyles();

    const [state, setState] = React.useState({
        mobileView: false,
        drawerOpen: false,
    });

    const {mobileView, drawerOpen} = state;

    const onLogoutClick = e => {
        e.preventDefault();
        logoutUser();
    };

    const {isAuthenticated} = auth;

    React.useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({...prevState, mobileView: true}))
                : setState((prevState) => ({...prevState, mobileView: false}));
        };

        setResponsiveness();

        window.addEventListener("resize", () => setResponsiveness());

        return () => {
            window.removeEventListener("resize", () => setResponsiveness());
        };
    }, []);


    const displayDesktop = () => {
        return (
            <Toolbar className={toolbar}>
                {Resumeblelogo}
                <div className="justify-content-end">
                    {getMenuButtons()}
                </div>
            </Toolbar>
        );
    };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({...prevState, drawerOpen: true}));

        const handleDrawerClose = () =>
            setState((prevState) => ({...prevState, drawerOpen: false}));

        return (
            <Toolbar>
                <IconButton
                    {...{
                        edge: "start",
                        color: "inherit",
                        "aria-label": "menu",
                        "aria-haspopup": "true",
                        onClick: handleDrawerOpen,
                    }}>
                    <MenuIcon color="disabled"/>
                </IconButton>
                <Drawer
                    {...{
                        anchor: "left",
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}>
                    <div className={drawerContainer}>{getDrawerChoices()}</div>
                </Drawer>
                <div>{Resumeblelogo}</div>
            </Toolbar>
        );
    };

    const getDrawerChoices = () => {
        if (isAuthenticated) {
            return <>
                <Link
                    {...{
                        component: RouterLink,
                        to: "/dashboard",
                        color: "inherit",
                        style: {textDecoration: "none"},
                        key: "dashboard",
                    }}>
                    <MenuItem>Landing</MenuItem>
                </Link>
                <Link
                    {...{
                        component: RouterLink,
                        to: "/profile",
                        color: "inherit",
                        style: {textDecoration: "none"},
                        key: "profile",
                    }}>
                    <MenuItem>Profile</MenuItem>
                </Link>
                <Link
                    {...{
                        component: RouterLink,
                        to: "/resume_upload",
                        color: "inherit",
                        style: {textDecoration: "none"},
                        key: "resume_upload"}}>
                    <MenuItem>Upload Resume</MenuItem>
                </Link>
                <Link
                    textDecoration="none"
                    color="inherit"
                    onClick={onLogoutClick}

                >
                    <MenuItem>Logout</MenuItem>
                </Link>
            </>
        } else {
            return headersDataLogout.map(({label, href}) => {
                return (
                    <Link
                        {...{
                            component: RouterLink,
                            to: href,
                            color: "inherit",
                            style: {textDecoration: "none"},
                            key: label,
                        }}
                    >
                        <MenuItem>{label}</MenuItem>
                    </Link>
                )
            });
        }
    };

    const Resumeblelogo = (
        <Typography variant="h6" component="h1" className={logo}>
            Resumeble
        </Typography>
    );

    const getMenuButtons = () => {
        if(isAuthenticated) {
            return <>
                <Button
                  {...{
                    key: "dashboard",
                    color: "inherit",
                    to: "/dashboard",
                    component: RouterLink,
                    className: menuButton}}>
                    Dashboard
                </Button>
                
                <Button
                    {...{
                       key: "profile",
                       color: "inherit",
                       to: "/profile",
                       component: RouterLink,
                       className: menuButton }}>
                    Profile
                </Button>

                <Button
                    {...{
                       key: "resume_upload",
                       color: "inherit",
                       to: "/resume_upload",
                       component: RouterLink,
                       className: menuButton }}>
                    Upload Resume
                </Button>
              
                <Button
                    color="inherit"
                    onClick={onLogoutClick}
                    className={menuButton}
                >
                    Logout
                </Button>
            </>
        } else {
            return headersDataLogout.map(({label, href}) => {
                return (
                    <Button
                        {...{
                            key: label,
                            color: "inherit",
                            to: href,
                            component: RouterLink,
                            className: menuButton
                        }}
                    >
                        {label}
                    </Button>
                );
            });
        }
    };

    return (
        <header>
            <AppBar className={header}>
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
        </header>
    );
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);