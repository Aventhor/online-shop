import React, { Component } from 'react';
import { Container, Grid, Typography, Button, Link as MuiLink } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Router from 'next/router'
import RequestManager from '../../src/modules/request-manager';
import Link from '../../src/Link';
import './scss/index.scss';

class SignUpPage extends React.Component<{}, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            user: {
                email: '',
                password: '',
                repeatPassword: '',
                firstName: '',
                lastName: '',
                middleName: ''
            },
            errorMessage: ''
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

        const result = await RequestManager.fetch('post', 'auth/sign-up', user)
        console.log(result);
        if (result.status === 201) {
            Router.push('/auth/success-sign-up')
        }
        else {
            this.setState({ errorMessage: result.data.message })
        }
    }

    render() {
        const { user, errorMessage } = this.state;

        return (
            <Container>
                <ValidatorForm ref="form" onSubmit={this.submitForm} className="sign-up__form">
                    <Grid container justify="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4">Register on My Site</Typography>
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

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
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
                                <Grid item xs={6}>
                                    <TextValidator
                                        fullWidth
                                        type="password"
                                        label="Repeat Password"
                                        onChange={this.handleChange}
                                        name="repeatPassword"
                                        value={user.repeatPassword}
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <TextValidator
                                        fullWidth
                                        type="text"
                                        label="Last Name"
                                        onChange={this.handleChange}
                                        name="lastName"
                                        value={user.lastName}
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextValidator
                                        fullWidth
                                        type="text"
                                        label="First Name"
                                        onChange={this.handleChange}
                                        name="firstName"
                                        value={user.firstName}
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextValidator
                                        fullWidth
                                        type="text"
                                        label="Middle Name"
                                        onChange={this.handleChange}
                                        name="middleName"
                                        value={user.middleName}
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                    />
                                </Grid>
                            </Grid>
                            <Typography color="error">{errorMessage}</Typography>

                            <Grid container justify="center">
                                <Button color="primary" variant="contained" type="submit">Register</Button>
                            </Grid>

                            <Grid container justify="center">
                                <Typography variant="body1">
                                    Already have an account?
                                    <MuiLink href="sign-in">Sign In</MuiLink>
                                </Typography>
                            </Grid>


                        </Grid>
                    </Grid>
                </ValidatorForm>

            </Container>
        )
    }
}

export default SignUpPage;