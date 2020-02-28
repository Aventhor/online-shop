import React, { Component } from 'react'
import { NextPageContext } from 'next';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import RegisterPage from './auth/sign-up';
import Router from 'next/router';

interface Props {
    products?: any[];
}

class Index extends React.Component<Props> {
    constructor(props: any) {
        super(props);

        this.state = {
            products: props.products,
        }
    }

    componentDidMount() {
        const { pathname } = Router

        if (pathname == '/')
            Router.push('/auth/auth');
    }


    // static async getInitialProps() {
    //     const res = await fetch('http://localhost:3000/api/v1/products')
    //     const data = await res.json();
    //     return { products: data }
    // }

    render() {
        return (
            <Container>

            </Container>
        )
    }
}

export default Index;
