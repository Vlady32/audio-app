import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UploadTrack from '../UploadTrack';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

import * as songsActions from '../../actions/SongsActions';

import "./User.less";

class User extends Component{

  componentWillMount(){
    if(this.props.auth.status == 'guest' || !this.props.auth.isAuthenticated){
      window.location.href = '/';
      return;
    }
    this.props.songsActions.getTracks();
  }

  handleOpenDialog = () => {
    this.props.songsActions.openUploadDialogTrack()
  }

  render(){

    return (
      <div className="User">

      {this.props.auth.status == 'admin' ? (

        <MuiThemeProvider>
          <Tabs>
           <Tab label="Tracks" >
             <RaisedButton label="Dialog" onTouchTap={this.handleOpenDialog} />
             <UploadTrack />
             <hr/>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Status</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableRowColumn>1</TableRowColumn>
                  <TableRowColumn>John Smith</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>2</TableRowColumn>
                  <TableRowColumn>Randal White</TableRowColumn>
                  <TableRowColumn>Unemployed</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>3</TableRowColumn>
                  <TableRowColumn>Stephanie Sanders</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>4</TableRowColumn>
                  <TableRowColumn>Steve Brown</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
           </Tab>
           <Tab label="Users" >
           </Tab>
         </Tabs>
       </MuiThemeProvider>
      ) : (
        <p>user</p>
      )}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    tracks: state.tracks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    songsActions: bindActionCreators(songsActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
