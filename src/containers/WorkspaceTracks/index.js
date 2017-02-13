import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Track from '../Track';
import * as songsActions from '../../actions/SongsActions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

import "./WorkspaceTracks.less";

var classNames = require('classnames');

class WorkspaceTracks extends Component{

  componentWillMount(){
    this.props.songsActions.getTracks(this.props.pathname);
  }

  render(){
    return (
      <div className='WorkspaceTracks'>
        <div className='container'>
          {this.props.tracks.fetchingTracks ? (
            <MuiThemeProvider>
              <CircularProgress style={{left: '540px', top: '20px'}} size={60} thickness={5} />
            </MuiThemeProvider>
          ) : (
            <div>
              {this.props.tracks.arraySongs.map((track, index) =>
                <Track key={Date.now() + index} isLiked={track.idsUsersLike.indexOf(this.props.auth.loginName) == -1 ? false : true } idTrack={track._id} trackName={track.name} urlImg={track.urlImg} urlTrack={track.urlTrack} trackIndex={index} trackIndexCategory={this.props.tracks.arrayCategories.map((el) => el._id).indexOf(track.category)} />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    tracks: state.tracks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    songsActions: bindActionCreators(songsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceTracks);
