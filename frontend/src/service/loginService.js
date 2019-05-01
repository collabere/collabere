import React, { Component } from 'react';
import axios from 'axios';

class LoginService extends Component {
    constructor(props) {
        super(props);
    }

    loginInfluencer(username, password) {
        console.log(username, '   ', password);
        let body = {
            username: username,
            password: password
        }
        return new Promise((resolve, reject) => {
            axios.post('http://127.0.0.1:8000/influencer/login', JSON.stringify(body)).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error.data);
            })
        })
    }
}

export default LoginService;