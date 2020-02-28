import { Component } from "react";
import Router from 'next/router'

class AuthPage extends Component {

    componentDidMount = () => {
        const { pathname } = Router

        if (pathname == '/auth/auth')
            Router.push('/auth/sign-up');
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default AuthPage;