import React, { Component } from 'react';
import axios from 'axios';
import { local, dev } from '../config/envConfig';

class LoginService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: (process.env.NODE_ENV === undefined) ? local.url : dev.url,
        }
    }

    loginInfluencer(username, password) {
        console.log(username, '   ', password);
        let body = {
            username: username,
            password: password
        }
        return new Promise((resolve, reject) => {
            axios.post(`${this.state.url}/influencer/login`, JSON.stringify(body)).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error.data);
            })
        })
    }
}

export default LoginService;
