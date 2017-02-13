import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as songsActions from '../../actions/SongsActions';
import * as playerActions from '../../actions/PlayerActions';

import Header from '../Header';
import Nav from '../Nav';
import WorkspaceTracks from '../WorkspaceTracks';
import Player from '../Player';

import './App.less';

var classNames = require('classnames');

class App extends Component{

  componentWillReceiveProps(nextProps){
    if(this.props.location.pathname !== nextProps.location.pathname){
      this.props.songsActions.getTracks(nextProps.location.pathname);
      if(this.props.player.isPlayingNow)
        this.props.playerActions.closePlayer();
    }
  }

  render(){
    var appClasses = classNames('container', 'App');

    return (
      <div className='App'>
        <div className="wrapper">
          <div className="content">
            <Header />
            <Nav pathname={this.props.ownProps.location.pathname}/>
            <WorkspaceTracks pathname={this.props.ownProps.location.pathname}/>
          </div>
          {this.props.player.isShownPlayer ? (
            <div className="footer">
              <Player />
            </div>
          ) : ''}
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    player: state.player,
    tracks: state.tracks.songs,
    fetching: state.tracks.fetching,
    ownProps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    songsActions: bindActionCreators(songsActions, dispatch),
    playerActions: bindActionCreators(playerActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
