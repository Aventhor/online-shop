import axios from 'axios';

const SERVER_PORT = 3000;

if (typeof window !== 'undefined') {
    axios.defaults.baseURL = `http://${window.location.hostname}:${SERVER_PORT}/api/v1/`;
}
axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class RequestManager {
    public static async fetch(type: string, url: string, body?: any) {
        switch (type) {
            case 'get':
                return await axios.get(url)
                    .catch(err => {
                        return err.response;
                    })
            case 'post':
                return await axios.post(url, body)
                    .catch(err => {
                        return err.response;
                    })
        }
    }
}

export default RequestManager;