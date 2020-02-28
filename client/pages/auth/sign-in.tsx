import React, { Component } from 'react';
import { Container, Grid, Typography, Button, Link } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Router from 'next/router'
import RequestManager from '../../src/modules/request-manager';
import AuthManager from '../../src/modules/auth-manager';

class SignInPage extends Component<{}, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            user: {
                email: '',
                password: ''
            },
            errorMessage: '',
        }
    }

    handleChange = (event) => {
        const { user } = this.state;

        const name = event.target.name;
        const value = event.target.value;

        user[name] = value;

        this.setState({
            user: user,
        })
    }

    submitForm = async () => {
        const { user } = this.state;

        const result = await RequestManager.fetch('post', 'auth/sign-in', user)
        console.log(result);
        if (result.status === 201) {
            AuthManager.authenticate(result.data.access_token);
            Router.push('/')
        }
        else {
            this.setState({ errorMessage: result.data.message })
        }
    }

    render() {
        const { user, errorMessage } = this.state;

        return (
            <Container>
                <ValidatorForm ref="form" onSubmit={this.submitForm} className="sign-in__form">
                    <Grid container justify="center">
                        <Grid item xs={12} md={4}>
                            <Typography variant="h4">Log In</Typography>
                            <Grid item xs={12}>
                                <TextValidator
                                    fullWidth
                                    type="email"
                                    label="Email"
                                    onChange={this.handleChange}
                                    name="email"
                                    value={user.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['This field is required', 'Email is not valid']}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
                                    fullWidth
                                    type="password"
                                    label="Password"
                                    onChange={this.handleChange}
                                    name="password"
                                    value={user.password}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                />
                            </Grid>

                            <Typography color="error">{errorMessage}</Typography>

                            <Grid container justify="center">
                                <Button color="primary" variant="contained" type="submit">Sign In</Button>
                            </Grid>

                            <Grid container justify="center">
                                <Typography variant="body1">
                                    Don't have an account yet?
                                    <Link href="sign-up">Sign Up</Link>
                                </Typography>

                            </Grid>

                        </Grid>
                    </Grid>
                </ValidatorForm>
            </Container>
        )
    }
}

export default SignInPage;