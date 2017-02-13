import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playerActions from '../../actions/PlayerActions';
import * as songsActions from '../../actions/SongsActions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FavouriteIcon from 'material-ui/svg-icons/action/favorite';
import HeadsetIcon from 'material-ui/svg-icons/hardware/headset';
import PlayIcon from 'material-ui/svg-icons/AV/play-arrow';
import PauseIcon from 'material-ui/svg-icons/AV/pause';
import SendIcon from 'material-ui/svg-icons/content/send';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


var classNames = require('classnames');

import './Track.less';

class Track extends Component {

  state = {
    isShownBGC: false,
    isLiked: this.props.isLiked,
    isPlayingCurrentTrackNow: false,
    isClicked: false
  }

  handleMouseEnterTrack = () => {
    this.setState({isShownBGC: true});
  }

  handleMouseLeaveTrack = () => {
    this.setState({isShownBGC: false});
  }

  handleClickSong = () => {

    if(this.props.player.isPlayingNow && this.state.isPlayingCurrentTrackNow){
      this.setState({isPlayingCurrentTrackNow: false});
      this.props.playerActions.pauseSong();
      return;
    }

    if(this.props.player.isShownPlayer && this.state.isClicked){
      this.setState({isPlayingCurrentTrackNow: true});
      this.props.playerActions.playSong();
      return;
    }

    this.setState({isPlayingCurrentTrackNow: true, isClicked: true});
    this.props.playerActions.openPlayer(this.props.trackIndex, this.props.trackIndexCategory);
  }

  handleClickLike = () => {
    this.props.songsActions.likeTrack(this.props.idTrack, this.props.auth.loginName);
    this.setState({isLiked: !this.state.isLiked});
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.player.trackIndex !== this.props.trackIndex){
      this.setState({isPlayingCurrentTrackNow: false, isClicked: false});
      return;
    }
    this.setState({isPlayingCurrentTrackNow: nextProps.player.isPlayingNow, isClicked: true})
  }

  handleDialogTrackOpen = (idDialogTrackIndex) => {
    this.props.songsActions.getComments(this.props.tracks.arraySongs[idDialogTrackIndex]._id);
    this.props.songsActions.openDialogTrack(idDialogTrackIndex);
  }

  handleDialogTrackClose = () => {
    this.props.songsActions.closeDialogTrack();
  }

  sendComment = (idDialogTrackIndex) => {
    if(this.refs.comment.getValue().length > 0){
      this.props.songsActions.sendComment(this.props.tracks.arraySongs[idDialogTrackIndex]._id, this.refs.comment.getValue(), this.props.auth.loginName);
    }
  }

  render() {

    const dialogTrackActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDialogTrackClose}
      />
    ];

    return (
      <div className="songCard">
        <div className="songImg" style={{backgroundImage: `url(${this.props.urlImg})`}} onMouseEnter={this.handleMouseEnterTrack} onMouseLeave={this.handleMouseLeaveTrack} onClick={this.handleClickSong}>
          {this.state.isShownBGC && !this.state.isPlayingCurrentTrackNow && !this.state.isClicked ? (
            <div className="blackBackground">
              <MuiThemeProvider>
                <PlayIcon color='#00BCD4' viewBox="0 0 20 20"/>
              </MuiThemeProvider>
            </div>
          ) : ''}

          {this.props.player.trackIndex == this.props.trackIndex && this.state.isPlayingCurrentTrackNow ? (
            <div className="blackBackgroundHover">
              <MuiThemeProvider>
                <PauseIcon color='#00BCD4' viewBox="0 0 20 20"/>
              </MuiThemeProvider>
            </div>
          ) : ''}

          {this.props.player.trackIndex == this.props.trackIndex && !this.state.isPlayingCurrentTrackNow && this.state.isClicked ? (
            <div className="blackBackgroundHover">
              <MuiThemeProvider>
                <PlayIcon color='#00BCD4' viewBox="0 0 20 20"/>
              </MuiThemeProvider>
            </div>
          ) : ''}

        </div>
        <div className="songBottomLine">
          <div className="songIcon"><img src={this.props.urlImg} alt="icon"/></div>
          <div className="songName">
            <p className="songTitle" onClick={() => this.handleDialogTrackOpen(this.props.trackIndex)} title={this.props.trackName}>{this.props.trackName}</p>
            <p className="songCtg">{this.props.tracks.arrayCategories[this.props.trackIndexCategory].name}</p>
          </div>
          {this.props.auth.isAuthenticated ? (
            <div className="songLike">
              <MuiThemeProvider>
                <FavouriteIcon onClick={this.handleClickLike} color={this.state.isLiked ? '#ff0000' : '#CCC'} viewBox="0 0 40 40"/>
              </MuiThemeProvider>
            </div>
          ) : ''}
        </div>
        <MuiThemeProvider>
          <Dialog
            className="dialogTrack"
            actions={dialogTrackActions}
            modal={false}
            open={this.props.tracks.isOpenedDialogTrack}
            onRequestClose={this.handleDialogTrackClose}
            autoScrollBodyContent={true}
          >
            <div className="titleSection">
              <div className="trackLogo"><img src={this.props.tracks.idDialogTrack !== -1 ? this.props.tracks.arraySongs[this.props.tracks.idDialogTrack].urlImg : ''} alt="logo"/></div>
              <div className="trackInfo">
                <div className="trackName" title={this.props.tracks.idDialogTrack !== -1 ? this.props.tracks.arraySongs[this.props.tracks.idDialogTrack].name : ''}>{this.props.tracks.idDialogTrack !== -1 ? this.props.tracks.arraySongs[this.props.tracks.idDialogTrack].name : ''}</div>
                <div className="trackCategory">{this.props.tracks.idDialogTrack !== -1 ? this.props.tracks.arrayCategories[this.props.trackIndexCategory].name : ''}</div>
                <div className="counts">
                  <div className="countLikes">
                    <MuiThemeProvider>
                      <FavouriteIcon color='#CCC' style={{marginRight: '15px'}} viewBox="0 0 35 35"/>
                    </MuiThemeProvider>
                    <div className="countLikesText">{this.props.tracks.idDialogTrack !== -1 ? this.props.tracks.arraySongs[this.props.tracks.idDialogTrack].countLikes : ''}</div>
                  </div>
                  <div className="countListenings">
                    <MuiThemeProvider>
                      <HeadsetIcon color='#CCC' style={{marginRight: '15px'}} viewBox="0 0 35 35"/>
                    </MuiThemeProvider>
                    <div className="countListeningsText">{this.props.tracks.idDialogTrack !== -1 ? this.props.tracks.arraySongs[this.props.tracks.idDialogTrack].countViews : ''}</div>
                  </div>
                </div>
              </div>
            </div>
            {this.props.auth.isAuthenticated ? (
              <div className="sectionTypingMessage">
                <MuiThemeProvider>
                  <TextField ref="comment" multiLine={true} rows={1} rowsMax={3} hintText="Type message" style={{width: '93%', float: 'left'}}/>
                </MuiThemeProvider>
                <MuiThemeProvider>
                  <SendIcon onClick={() => this.sendComment(this.props.tracks.idDialogTrack)} color='#CCC' style={{marginLeft: '10px', width: '5%', float: 'left', marginTop: '20px', cursor: 'pointer'}}/>
                </MuiThemeProvider>
              </div>
            ) : ''}
            {this.props.tracks.fetchingComments ? (
              <MuiThemeProvider>
                <CircularProgress style={{left: '300px', top: '20px'}} size={60} thickness={5} />
              </MuiThemeProvider>
            ) : (
              <div className="sectionComments">
                  {this.props.tracks.arrayComments.map((comment, index) =>
                    <MuiThemeProvider key={Date.now() + index}>
                      <Card>
                        <CardHeader
                          title={comment.login}
                          subtitle={comment.creationDate}
                          avatar="img/user.ico"
                        />
                        <CardText>{comment.text}</CardText>
                      </Card>
                    </MuiThemeProvider>
                  )}
              </div>
            )}
        </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    tracks: state.tracks,
    player: state.player
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    playerActions: bindActionCreators(playerActions, dispatch),
    songsActions: bindActionCreators(songsActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Track);
