import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UploadChangeTrack from '../UploadChangeTrack';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import * as songsActions from '../../actions/SongsActions';
import * as usersActions from '../../actions/AuthActions';

import "./User.less";

class User extends Component{

  state = {
    login: '',
    password: '',
    isAdmin: false,
    chosenId: ''
  }

  componentWillMount(){
    if(this.props.auth.status == 'guest' || !this.props.auth.isAuthenticated){
      window.location.href = '/';
      return;
    }
    this.props.songsActions.getTracks();
    this.props.usersActions.getUsers();
  }

  handleOpenUploadDialog = () => {
    this.props.songsActions.openUploadChangeDialogTrack('upload');
  }

  handleOpenChangeDialog = (rowNum) => {
    this.props.songsActions.openUploadChangeDialogTrack('change', rowNum);
  }

  handleSnackbarClose = () => {
    this.props.songsActions.clearMessageUpload();
    this.props.usersActions.clearMessageAdd();
    this.props.songsActions.getTracks();
    this.props.usersActions.getUsers();
  }

  onChangeLogin = (event, value) => {
    this.setState({login: value});
  }

  onChangePassword = (event, value) => {
    this.setState({password: value});
  }

  onToggleAdmin = (event, value) => {
    this.setState({isAdmin: value});
  }

  addUser = () => {
    this.props.usersActions.addUser(this.state.login, this.state.password, this.state.isAdmin);
    this.clearState();
  }

  editUser = () => {
    this.props.usersActions.editUser(this.state.chosenId, this.state.login, this.state.password, this.state.isAdmin);
    this.clearState();
  }

  deleteUser = () => {
    if(confirm("Do you really want to delete this user?")){
      this.props.usersActions.deleteUser(this.state.chosenId);
      this.clearState();
    }
  }

  clickUser = (arrayIndex) => {
    this.setState({
      chosenId: this.props.users.arrayUsers[arrayIndex]._id,
      login: this.props.users.arrayUsers[arrayIndex].email,
      isAdmin: this.props.users.arrayUsers[arrayIndex].status == 'admin' ? true : false
    });

  }

  clearState = () => {
    this.setState({
      login: '',
      password: '',
      isAdmin: false,
      chosenId: ''
    });
  }

  render(){

    return (
      <div className="User">

      {this.props.auth.status == 'admin' ? (

        <MuiThemeProvider>
          <Tabs>
           <Tab label="Tracks" >
             <RaisedButton label="Upload track" style={{marginTop: '20px'}} secondary={true} fullWidth={true} onTouchTap={this.handleOpenUploadDialog} />
             <UploadChangeTrack />
             <hr/>
             <Table style={{width: '90%', fontFamily: 'Roboto-Regular'}} onCellClick={this.handleOpenChangeDialog}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Image</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Category</TableHeaderColumn>
                  <TableHeaderColumn>Audio</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {this.props.tracks.arraySongs.map((track, index) =>
                  <TableRow style={{cursor: 'pointer'}} key={Date.now() + index}>
                    <TableRowColumn>{track._id}</TableRowColumn>
                    <TableRowColumn><img src={track.urlImg} alt="image" style={{width: '50px', padding: '5px'}}/></TableRowColumn>
                    <TableRowColumn>{track.name}</TableRowColumn>
                    <TableRowColumn>{this.props.tracks.arrayCategories[this.props.tracks.arrayCategories.map((el) => el._id).indexOf(track.category)].name}</TableRowColumn>
                    <TableHeaderColumn><audio preload="none" controls src={track.urlTrack}></audio></TableHeaderColumn>
                </TableRow>
                )}
              </TableBody>
            </Table>
           </Tab>
           <Tab label="Users" >
             <div style={{textAlign: 'center'}}>
               <TextField value={this.state.login} onChange={this.onChangeLogin} hintText="Login" style={{marginLeft: '30px'}}/>
               <TextField  value={this.state.password} onChange={this.onChangePassword} type="password" style={{marginLeft: '30px'}} hintText="Password"/>
               <Toggle
                 onToggle={this.onToggleAdmin}
                  label="Admin"
                  toggled={this.state.isAdmin}
                  defaultToggled={false}
                  style={{width: '100px', display: 'inline-block', marginLeft: '50px'}}
                />
              </div>
              <div style={{margin: '20px auto', textAlign: 'center'}}>
                <RaisedButton label="Delete user" onClick={this.deleteUser} backgroundColor="#9E9E9E" style={{width: '250px'}} disabled={!this.state.login || !this.state.chosenId}/>
                <RaisedButton label="Edit user" onClick={this.editUser} style={{width: '250px'}} secondary={true} disabled={!this.state.login ||!this.state.password || !this.state.chosenId}/>
                <RaisedButton label="Add user" onClick={this.addUser} style={{width: '250px'}} primary={true} disabled={!this.state.login || (this.state.login.length < 4) || !this.state.password || (this.state.password.length < 4)}/>
              </div>
             <hr/>
             <Table onCellClick={this.clickUser} style={{fontFamily: 'Roboto-Regular'}}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Login</TableHeaderColumn>
                  <TableHeaderColumn>Date of creation</TableHeaderColumn>
                  <TableHeaderColumn>Status</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {this.props.users.arrayUsers.map((user, index) =>
                  <TableRow style={{cursor: 'pointer'}} key={Date.now() + index}>
                    <TableRowColumn>{user._id}</TableRowColumn>
                    <TableRowColumn>{user.email}</TableRowColumn>
                    <TableRowColumn>{user.creationDate}</TableRowColumn>
                    <TableRowColumn>{user.status}</TableRowColumn>
                </TableRow>
                )}
              </TableBody>
            </Table>
           </Tab>
         </Tabs>
       </MuiThemeProvider>
      ) : (
        <p>user</p>
      )}
      <MuiThemeProvider>
        <Snackbar
          open={this.props.tracks.deletedTrackMessage ? true : false}
          message={this.props.tracks.deletedTrackMessage}
          autoHideDuration={3000}
          onRequestClose={this.handleSnackbarClose}
        />
      </MuiThemeProvider>
      <MuiThemeProvider>
        <Snackbar
          open={this.props.users.msg ? true : false}
          message={this.props.users.msg}
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
    auth: state.auth,
    tracks: state.tracks,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    songsActions: bindActionCreators(songsActions, dispatch),
    usersActions: bindActionCreators(usersActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
