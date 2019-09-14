import React from 'react';
import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import InstagramLogin from 'react-instagram-login';
import * as axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isAuthenticated: false, user: null, token: ''};
    }

    logout = () => {
        this.setState({isAuthenticated: false, user: null, token: ''});
    }

    twitterResponse = (response) => {
        const token = response.headers.get('x-auth-token');
        response.json().then(user => {
            if (token) {
                this.setState({isAuthenticated: true, user, token});
            }
        });
    }

    facebookResponse = (response) => {
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('http://localhost:8000/api/v1/auth/facebook', options).then(r => {
            const token = r.headers.get('x-auth-token');
            r.json().then(user => {
                if (token) {
                    this.setState({isAuthenticated: true, user, token})
                }
            });
        })
    }

    googleResponse = (response) => {
        // const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        // const options = {
        //     method: 'POST',
        //     body: tokenBlob,
        //     mode: 'cors',
        //     cache: 'default'
        // };
        // fetch('/accounts/google/login/callback/', options).then(r => {
        //     const token = r.headers.get('x-auth-token');
        //     console.log(r.json());
        //     r.json().then(user => {
        //         console.log(user);
        //         if (token) {
        //             this.setState({isAuthenticated: true, user, token})
        //         }
        //     }).catch(err => {
        //         console.log(err);
        //     });
        // })
        console.log(response.profileObj.email);
        
        axios({
            method: "post",
            url: `/api/login`,
            data: {
              username: this.state.username,
              password: this.state.password
            },
            headers: {
              "content-type": "application/json"
            }
          }).then(response => {
            const { token, username } = response.data;
            if (token) {
              axios.defaults.headers.common["Authorization"] = 'Token '+ token;
              this.setState({ authenticatedUsername: username });
            } else {
              axios.defaults.headers.common["Authorization"] = null;
            }
          });
    }

    instagramResponse = (response) => {
        console.log(response);
    }

    onFailure = (e) => {
        alert(e);
    }

    render() {
        let content = !!this.state.isAuthenticated ?
            (
                <div>
                    <p>Authenticated</p>
                    <div>
                        {this.state.user.email}
                    </div>
                    <div>
                        <button onClick={this.logout} className="button">
                            Log out
                        </button>
                    </div>
                </div>
            ) :
            (
                <div>
                    {/* <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
                                   onFailure={this.twitterResponse} onSuccess={this.twitterResponse}
                                   requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"/> */}
                    {/* <FacebookLogin
                        appId="XXXXXXXXXX"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.facebookResponse} /> */}
                    <GoogleLogin
                        clientId="226653634564-adqtobrilha28amq3jhksflm1tnd8abh.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.googleResponse}
                        onFailure={this.googleResponse}
                    />
                     <InstagramLogin
                        clientId="49f4a71ef28b448a864a7519a197ba0c"
                        buttonText="Login"
                        onSuccess={this.instagramResponse}
                        onFailure={this.instagramResponse}
                    />
                </div>
            );
        return(
            <div className="App">
                {content}
            </div>
        );
    }
}

export default Login;