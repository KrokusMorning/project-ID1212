import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

import ImageUpload from './ImageUpload'
import Images from './Images'

function Auth() {
    return (
        <Router>
            <div>
                <AuthButton />
                <ul>
                    <li>
                        <Link to="/images">Images</Link>
                    </li>
                    <li>
                        <Link to="/imageUpload">Upload Image</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
                <Route path="/public" component={Public} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/protected" component={Protected} />
                <PrivateRoute path='/images' component={Images}/>
                <PrivateRoute path='/imageUpload' component={ImageUpload}/>
                <Route path='/register' component={Register}/>
            </div>
        </Router>
    );
}

const auth = {
    user: "",
    admin: false,
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        this.getRole(cb);
    },
    signout(cb) {
        this.user = "";
        this.admin = false;
        this.isAuthenticated = false;
        cb();
    },
    getRole(cb){
        fetch('/roles', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log('response=' + response);
                return response.json()
            }
        })
            .then((responseData) => {
                this.user = responseData.username;
                if(this.role = responseData.authorities[0].name === "ROLE_ADMIN")
                    this.admin = true;
                cb();
            })
    }
};

const AuthButton = withRouter(
    ({ history }) =>
        auth.isAuthenticated ? (
            <p>
                Welcome {auth.user}!
                <button
                    onClick={() => {
                        auth.signout(() => history.push("/"));
                    }}
                >
                    Sign out
                </button>
            </p>
        ) : (
            <p>You are not logged in.</p>
        )
);

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                auth.isAuthenticated ? (
                    <Component {...props} auth={auth.admin}/>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

function Public() {
    return <h3>Public</h3>;
}

function Protected() {
    return <h3>Protected</h3>;
}

class Login extends React.Component {

    state = {
            redirectToReferrer: false,
            username: "",
            password: "",
    };

    constructor(props) {
        super(props);
        this.state = {redirectToReferrer: false,
            username: "",
            password: "",};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.login = this.login.bind(this);
    }


    login = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('/perform_login', {
            method: 'POST',
            body: data,
        })
            .then((response) => {
                console.log(response)
            if(!response.ok && response.status === 401) throw new Error("Wrong username or password");
                else if(!response.ok && response.status === 500) throw new Error("Server error, please try again later.");
            else return response;
        })
            .then((data) => {
                auth.authenticate(() => {
                    this.setState({ redirectToReferrer: true });
                });
            })
            .catch((error) => {
                alert(error)
            });
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;


        this.setState({
            [name]: value
        });
    }

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <div>
                <form onSubmit={this.login}>
                    <label>
                        Username:
                        <input
                            name="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleInputChange}/>

                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            role: "ROLE_USER",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <input
                        name="username"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Choose privileges:
                    <select name="role"
                            value={this.state.role}
                            onChange={this.handleInputChange}>
                        <option value="ROLE_USER">USER</option>
                        {auth.admin ? <option value="ROLE_ADMIN">ADMIN</option> : null}
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch('/registration', {
            method: 'POST',
            body: data,
        }).
        then((response) => {
            if(!response.ok)
                return response.json();
            else
                return response;
        }).
        then((response) => {
            if(!response.ok) throw new Error(response.message);
            else return response;
        })
            .then((data) => {
                alert("User created");
            })
            .catch((error) => {
                alert(error);
            });
    }
}

export default Auth;