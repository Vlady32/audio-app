import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {Tabs, Tab} from 'material-ui/Tabs';
import {grey500,grey300} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';

import * as authActions from '../../actions/AuthActions';
import * as songsActions from '../../actions/SongsActions';
import * as playerActions from '../../actions/PlayerActions';

import {ERROR_VALID_INPUT,ERROR_PASSWORD_CONFIRMED_PASSWORD,SUCCESS_REGISTER,SUCCESS_AUTHENTICATION} from '../../constants/App';

var classNames = require('classnames');

import './Header.less';

class Header extends Component{

  state = {
    isShownSignIn: false,
    isShownErrorAuth: true,
    isShownTextReg: true,
    isOpenedLoginDialog: false,
    isLoginTab: true,
    loginErrorText: '',
    passwordErrorText: '',
    confirmedPasswordErrorText: ''
  };

  toggleTabs = (tab) => {
    if(tab == 1){
      this.setState({isLoginTab: true});
    }else{
      this.setState({isLoginTab: false});
    }
  };

  validateForm = (login, password, confirmedPassword = '') => {
    let isValidated = true;

    if(login.length < 4){
      this.setState({loginErrorText: ERROR_VALID_INPUT});
      isValidated = false;
    }

    if(password.length < 4){
      this.setState({passwordErrorText: ERROR_VALID_INPUT});
      isValidated = false;
    }

    if(confirmedPassword){
      if(password !== confirmedPassword){
        this.setState({confirmedPasswordErrorText: ERROR_PASSWORD_CONFIRMED_PASSWORD});
        isValidated = false;
      }
    }

    return isValidated;
  }

  handleLogIn = () => {
    let loginValue = this.refs.logInFieldLogin.getValue();
    let passwordValue = this.refs.passwordFieldLogin.getValue();

    if(this.validateForm(loginValue, passwordValue)){
      this.setState({
        isShownErrorAuth: true
      });
      this.props.authActions.sendAuthRequest(loginValue, passwordValue);
    }

  }

  onChangeInput = () => {
    this.setState({
      loginErrorText: '',
      passwordErrorText: '',
      confirmedPasswordErrorText: '',
      isShownErrorAuth: false,
      isShownTextReg: false
    });
  }

  handleSignUp = () => {
    let loginValue = this.refs.logInFieldRegister.getValue();
    let passwordValue = this.refs.passwordFieldRegister.getValue();
    let confirmedPasswordValue = this.refs.confirmedPasswordFieldRegister.getValue();

    if(this.validateForm(loginValue, passwordValue, confirmedPasswordValue)){
      this.setState({
        isShownTextReg: true
      });
      this.props.authActions.sendRegRequest(loginValue, passwordValue);
    }
  }

  handleOpenLoginDialog = () => {
    this.setState({isOpenedLoginDialog: true});
  };

  handleCloseDialogs = () => {
    this.setState({isOpenedLoginDialog: false});
    this.setState({isLoginTab: true});
  };

  handleLoginButton = () => {
    let signIn = document.querySelector(".signIn");
    if(this.state.isShownSignIn){
      signIn.classList.add("displayNone");
      this.setState({isShownSignIn: false});
    }else {
      signIn.classList.remove("displayNone");
      this.setState({isShownSignIn: true});
    }
  };

  handleSnackbarClose = () => {
    this.props.authActions.clearMessages();
    this.setState({isOpenedLoginDialog: false, isLoginTab: true});
  }

  onKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.props.playerActions.closePlayer();
      this.props.songsActions.searchSong(this.refs.searchField.input.value.toLowerCase());
    }
  }

  render(){

    let searchClasses = classNames('glyphicon', 'glyphicon-search');
    let userClasses = classNames('glyphicon', 'glyphicon-user');
    let downClasses = classNames('glyphicon', 'glyphicon-menu-down');
    let signInClasses = classNames('signIn', 'displayNone');

    const styles = {
      hintStyle: {
        color: grey500
      },
      underlineStyle: {
        borderColor: grey500,
      },
      underlineFocusStyle: {
        borderColor: grey300,
      }
    };

    const tabStyles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };

    const cancelbutton = <RaisedButton
      label="Cancel"
      secondary={true}
      style={{margin: 12}}
      onTouchTap={this.handleCloseDialogs}
    />;

    const actionsLogIn = [
      cancelbutton,
      <RaisedButton
        label="Log In"
        primary={true}
        style={{margin: 12}}
        onTouchTap={this.handleLogIn}
      />
    ];

    const actionsSignUp = [
      cancelbutton,
      <RaisedButton
        label="Sign Up"
        primary={true}
        style={{margin: 12}}
        onTouchTap={this.handleSignUp}
      />
    ];

    return (
      <div className='Header'>
        <div className='container'>
          <div className='row'>
            <div className="col-md-3">
              <div className="logo"><img src="img/logo.png" alt="Logo"/></div>
              <div className="appName">audioredux</div>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="search">
                <span className={searchClasses} aria-hidden="true"></span>
                <MuiThemeProvider>
                  <TextField ref="searchField" onKeyPress={this.onKeyPress} onChange={this.onChangeSearchField} hintText="SEARCH" hintStyle={styles.hintStyle} underlineStyle={styles.underlineStyle} underlineFocusStyle={styles.underlineFocusStyle} inputStyle={{color: grey300, width: '80%'}}/>
                </MuiThemeProvider>
              </div>
            </div>
            <div className="col-md-1">
              <div className="login" onClick={this.handleLoginButton}>
                <span className={userClasses} aria-hidden="true"></span>
                <span className={downClasses} aria-hidden="true"></span>
              </div>
              <MuiThemeProvider>
                {this.props.auth.isAuthenticated ? (
                  <div className={signInClasses}>
                    <RaisedButton label={this.props.auth.loginName} className="but" onTouchTap={this.handleOpenLoginDialog}/>
                    <RaisedButton label="Log Out"  className="but" onTouchTap={this.props.authActions.logOut}/>
                  </div>
                ) : (
                  <div className={signInClasses}>
                    <RaisedButton label="Log In"  className="but" onTouchTap={this.handleOpenLoginDialog}/>
                  </div>
                )}
              </MuiThemeProvider>

            </div>
          </div>
        </div>
        <MuiThemeProvider>
          <Dialog
            actions={this.state.isLoginTab ? actionsLogIn : actionsSignUp}
            modal={false}
            open={this.state.isOpenedLoginDialog}
            onRequestClose={this.handleCloseLoginDialog}
            contentStyle={{width: '400px', textAlign: 'center'}}
          >
            <Tabs>
              <Tab label="Log In" onClick={this.toggleTabs.bind(this, 1)}>
                {this.props.auth.fetchingAuth ? (
                  <CircularProgress innerStyle={{marginTop: '50px', marginLeft: '130px'}} size={80} thickness={5} />
                ) : (
                    <div>
                      <TextField
                        hintText="Login"
                        floatingLabelText="Login"
                        fullWidth={true}
                        errorText={this.state.loginErrorText}
                        ref="logInFieldLogin"
                        onChange={this.onChangeInput}
                      /> <br/>
                      <TextField
                        hintText="Password"
                        floatingLabelText="Password"
                        type="password"
                        fullWidth={true}
                        errorText={this.state.passwordErrorText}
                        ref="passwordFieldLogin"
                        onChange={this.onChangeInput}
                      />
                    {this.state.isShownErrorAuth ? <p style={{color: 'red'}}>{this.props.auth.error_msg}</p> : ''}
                    </div>
                  )
                }
              </Tab>
              <Tab label="Sign Up" onClick={this.toggleTabs.bind(this, 2)}>
                {this.props.auth.fetchingReg ? (
                  <CircularProgress innerStyle={{marginTop: '50px', marginLeft: '130px'}} size={80} thickness={5} />
                ) : (
                    <div>
                      <TextField
                        hintText="Login"
                        floatingLabelText="Login"
                        fullWidth={true}
                        ref="logInFieldRegister"
                        errorText={this.state.loginErrorText}
                        onChange={this.onChangeInput}
                      /> <br/>
                      <TextField
                        hintText="Password"
                        floatingLabelText="Password"
                        type="password"
                        fullWidth={true}
                        ref="passwordFieldRegister"
                        errorText={this.state.passwordErrorText}
                        onChange={this.onChangeInput}
                      /><br />
                      <TextField
                        hintText="Confirm password"
                        floatingLabelText="Confirm password"
                        type="password"
                        fullWidth={true}
                        ref="confirmedPasswordFieldRegister"
                        errorText={this.state.confirmedPasswordErrorText}
                        onChange={this.onChangeInput}
                      />
                    {this.state.isShownTextReg ? <p style={{color: 'red'}}>{this.props.auth.msg_reg}</p> : ''}
                  </div>
                  )
                }
              </Tab>
            </Tabs>
          </Dialog>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Snackbar
            open={this.props.auth.isAuthenticatedDialog}
            message={SUCCESS_AUTHENTICATION}
            autoHideDuration={3000}
            onRequestClose={this.handleSnackbarClose}
          />
      </MuiThemeProvider>
        <MuiThemeProvider>
          <Snackbar
            open={this.props.auth.isRegistered}
            message={SUCCESS_REGISTER}
            autoHideDuration={3000}
            onRequestClose={this.handleSnackbarClose}
          />
        </MuiThemeProvider>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    songsActions: bindActionCreators(songsActions, dispatch),
    playerActions: bindActionCreators(playerActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
