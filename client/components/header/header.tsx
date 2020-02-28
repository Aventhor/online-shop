import { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, ButtonGroup, Container } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './index.scss';
import AuthManager from '../../src/modules/auth-manager';
import Router from 'next/router';

interface Props {
    authUser?: object;
}

class Header extends Component<Props, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            menuOpen: false,
            anchorEl: null,
        }

    }

    // static getInitialProps = async () => {
    //     return { authUser: Props }
    // }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.authUser !== this.props.authUser)
            this.setState({
                authUser: AuthManager.getAuthUser(),
            })
    }

    handleClose = () => {
        this.setState({ menuOpen: false, anchorEl: null })
    }

    handleClickMenu = (event) => {
        this.setState({ menuOpen: true, anchorEl: event.target })
    }

    handleLoginClick = () => {
        Router.push('/auth/sign-in')
    }

    handleSignUpClick = () => {
        Router.push('/auth/sign-up')
    }

    render() {
        const { authUser } = this.props;

        return (
            <AppBar className="app-bar">
                <Container className="app-bar__container">
                    {authUser ?
                        <Button
                            endIcon={<ArrowDropDownIcon />}
                            onClick={this.handleClickMenu}
                        >
                            user
                            <Menu
                                anchorEl={this.state.acnchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={this.state.menuOpen}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                            </Menu>
                        </Button> :
                        <Toolbar>
                            <Button onClick={this.handleSignUpClick} color="primary" variant="outlined">
                                Sign Up
                            </Button>
                            <Button onClick={this.handleLoginClick} color="primary">
                                Sign In
                            </Button>
                        </Toolbar>

                    }


                </Container>
            </AppBar>
        );
    }
}

export default Header;