import React, { Component } from 'react';
import { Container, Grid, Typography, Link } from '@material-ui/core';

class SuccessSignUpPage extends Component {

    render() {
        return (
            <Container>
                <Grid container justify="center">
                    <Grid item xs={12} md={6} className="success-sign-up__content">
                        <Typography variant="h6">Registration successful completed!</Typography>
                        <Typography variant="body1">Please, <Link href="sign-in">Log In</Link></Typography>
                    </Grid>
                </Grid>

                <style global jsx>{`
                    .success-sign-up__content {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        position: absolute;
                        top: 40%;
                        bottom: 60%;
                    }
                    .success-sign-up__content p {
                        margin: auto;
                    }
                `}</style>

            </Container>
        )
    }
}

export default SuccessSignUpPage;