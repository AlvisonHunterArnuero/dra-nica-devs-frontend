import React, { Component } from "react";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsr = this.onChangeUsr.bind(this);
    this.onChangePwd = this.onChangePwd.bind(this);
    this.loginStatus = this.loginStatus.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      userName: "",
      userPwd: "",
      loginError: false,
    };
  }

  onChangeUsr(e) {
    this.setState({
      userName: e.target.value,
    });
  }

  onChangePwd(e) {
    this.setState({
      userPwd: e.target.value,
    });
  }

  loginStatus(props) {
    if (props) {
      sessionStorage.setItem("isLoggedIn", true);
      window.location.reload(false);
    } else {
      sessionStorage.setItem("isLoggedIn", false);
      this.setState({
        loginError: true,
      });
    }
  }

  handleLogin(e) {
    e.preventDefault();
    let usr = process.env.REACT_APP_USER_NAME;
    let pwd = process.env.REACT_APP_USER_PWD;
    let currUsr = this.state.userName;
    let currPwd = this.state.userPwd;
    currUsr === usr && currPwd === pwd
      ? this.loginStatus(true)
      : this.loginStatus(false);
  }
  render() {
    return (
      <div className='container'>
        <div className='row d-flex justify-content-center'>
          <div className='col-md-5'>
            <div className='text-white mt-4 p-4 border border-info'>
              <form className='row g-3'>
                <h4 className="text-warning">Welcome Back</h4>
                {this.state.loginError && (
                  <div className='alert alert-danger' role='alert'>
                    Oopsie! Invalid UserName or Password. Please Try Again.
                  </div>
                )}
                <div className='col-12'>
                  <label>Username</label>
                  <input
                    type='text'
                    name='username'
                    className='form-control'
                    placeholder='Username'
                    value={this.state.userName}
                    onChange={this.onChangeUsr}
                  />
                </div>
                <div className='col-12'>
                  <label>Password</label>
                  <input
                    type='password'
                    name='password'
                    className='form-control'
                    placeholder='Password'
                    value={this.state.userPwd}
                    onChange={this.onChangePwd}
                  />
                </div>
                <div className='col-12'>
                  <button
                    type='submit'
                    onClick={this.handleLogin}
                    className='btn btn-outline-info float-end'
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
