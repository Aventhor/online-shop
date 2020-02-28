import Cookies from 'universal-cookie';

const cookies = new Cookies();

class AuthManager {

    public static authenticate(token: string) {
        cookies.set(`token`, token);
    }

    public static deauthenticate() {
        cookies.remove(`token`);
    }

    public static getAuthUser() {
        const user = cookies.get('token');
        console.log(user)
        return user ? user : null;
    }
}

export default AuthManager;