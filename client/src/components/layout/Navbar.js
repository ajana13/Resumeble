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
import MenuIcon from "@material-ui/icons/Menu";
import {  Link as RouterLink  } from "react-router-dom";

import { logoutUser } from "../../redux/actions/authActions";

const headersDataLogin = [
    {
        label: "Home",
        href: "/dashboard",
    },
    {
        label: "Logout",
        href: "/logout",
    },
]

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
]

const headersData = [
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
]

// className="justify-content-end"

const useStyles = makeStyles(() => ({
    header: {
        // backgroundColor: "#400CCC",
        background: 'transparent',
        boxShadow: 'none',
        paddingRight: "79px",
        paddingLeft: "118px",
        "@media (max-width: 900px)": {
            paddingLeft: 0,
        },

    },
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "black",
        textAlign: "left",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
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
    const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

    const [state, setState] = React.useState({
        mobileView: false,
        drawerOpen: false,
    });

    const { mobileView, drawerOpen } = state;

    const onLogoutClick = e => {
        e.preventDefault();
        logoutUser();
    };

    const { isAuthenticated } = auth;

    React.useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({ ...prevState, mobileView: false }));
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
            setState((prevState) => ({ ...prevState, drawerOpen: true }));

        const handleDrawerClose = () =>
            setState((prevState) => ({...prevState, drawerOpen: false }));

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
                    <MenuIcon color="disabled"  />
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
        return headersData.map(({ label, href }) => {
            return (
                <Link
                    {...{
                        component: RouterLink,
                        to: href,
                        color: "inherit",
                        style: { textDecoration: "none" },
                        key: label,
                    }}
                >
                    <MenuItem>{label}</MenuItem>
                </Link>
            );
        });
    };

    const Resumeblelogo = (
        <Typography variant="h6" component="h1" className={logo}>
            Resumeble
        </Typography>
    );

    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
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
    };

    return (
        <header>
            <AppBar className={header}>
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
        </header>
    );

    /*
    const onLogoutClick = e => {
        e.preventDefault();
        logoutUser();
    };

    const { isAuthenticated } = auth;

    const loggedInNav = () => (
        <div className="navbar-fixed">
            <nav className="z-depth-0">
                <div className="nav-wrapper white">
                    <Link
                        to="/dashboard"
                        style={{
                            fontFamily: "monospace"
                        }}
                        className="col s5 brand-logo black-text">
                        <i className="material-icons">code</i>
                        Landing
                    </Link>
                    <button
                        style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        onClick={onLogoutClick}
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );

    const loggedOutNav = () => (
        <div className="navbar-fixed">
            <nav className="z-depth-0">
                <div className="nav-wrapper white">
                    <Link
                        to="/"
                        style={{
                            fontFamily: "monospace"
                        }}
                        className="col s5 brand-logo black-text">
                        <i className="material-icons">code</i>
                        Landing
                    </Link>
                    <Link
                        to="/login"
                        style={{
                            fontFamily: "monospace"
                        }}
                        className="col s5 brand-logo black-text">
                        <i className="material-icons">code</i>
                        Login
                    </Link>
                    <Link
                        to="/register"
                        style={{
                            fontFamily: "monospace"
                        }}
                        className="col s5 brand-logo black-text">
                        <i className="material-icons">code</i>
                        Register
                    </Link>
                </div>
            </nav>
        </div>
    );

    return (
        <>
            {isAuthenticated ? loggedInNav() : loggedOutNav()}
        </>
    );
     */
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);