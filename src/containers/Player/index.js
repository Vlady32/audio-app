import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playerActions from '../../actions/PlayerActions';
import * as songsActions from '../../actions/SongsActions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PreviousIcon from 'material-ui/svg-icons/AV/fast-rewind';
import NextIcon from 'material-ui/svg-icons/AV/fast-forward';
import PlayIcon from 'material-ui/svg-icons/AV/play-arrow';
import PauseIcon from 'material-ui/svg-icons/AV/pause';
import VolumeIcon from 'material-ui/svg-icons/AV/volume-mute';
import VolumeOffIcon from 'material-ui/svg-icons/AV/volume-off';
import Slider from 'material-ui/Slider';

var classNames = require('classnames');

import './Player.less';

class Player extends Component {

  state = {
    currentTrack: new Audio(),
    trackTimeString: '00:00',
    trackTimeSec: 2,
    currentTrackTime: '00:00'
  }

  componentDidMount() {
    this.state.currentTrack.addEventListener('loadedmetadata', this.getTrackTime);
    this.setState({
      interval: setInterval(this.getCurrentTrackTime, 1000)
    });
    this.handleClickPlay();
    this.props.playerActions.incCountListenings(this.props.tracks.arraySongs[this.props.player.trackIndex]._id);
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    this.handleClickPause();
    this.state.currentTrack.removeEventListener('loadedmetadata', this.getTrackTime);
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.currentTrack.ended) {
      this.playerClickNext();
    }

    if (prevProps.player.trackIndex !== this.props.player.trackIndex) {
      this.props.playerActions.incCountListenings(this.props.tracks.arraySongs[this.props.player.trackIndex]._id);
      this.handleClickPlay();
      return;
    }

    if (this.props.player.isPlayingNow) {
      this.handleClickPlay();
    } else {
      this.handleClickPause();
    }
  }

  handleClickPlay = () => {
    if (this.state.currentTrack.src !== this.props.tracks.arraySongs[this.props.player.trackIndex].urlTrack) {
      this.state.currentTrack.src = this.props.tracks.arraySongs[this.props.player.trackIndex].urlTrack;
    }
    this.state.currentTrack.play();
  }

  handleClickPause = () => {
    this.state.currentTrack.pause();
  }

  playerClickPlay = () => {
    this.props.playerActions.playSong();
  }

  playerClickPause = () => {
    this.props.playerActions.pauseSong();
  }

  playerClickNext = () => {
    let indexTrack = this.props.player.trackIndex;
    if (++indexTrack < this.props.tracks.arraySongs.length) {
      this.props.playerActions.nextSong();
      this.props.playerActions.incCountListenings(this.props.tracks.arraySongs[this.props.player.trackIndex]._id);
    } else {
      this.props.playerActions.turnOnFirstSong();
    }
  }

  playerClickPrevious = () => {
    let indexTrack = this.props.player.trackIndex;
    if (--indexTrack >= 0) {
      this.props.playerActions.previousSong();
      this.props.playerActions.incCountListenings(this.props.tracks.arraySongs[this.props.player.trackIndex]._id);
    } else {
      this.props.playerActions.turnOnLastSong(this.props.tracks.arraySongs.length - 1);
    }
  }

  getTrackTime = () => {
    let min = Math.floor(this.state.currentTrack.duration / 60);
    let sec = Math.floor(this.state.currentTrack.duration - min * 60);
    this.setState({
      trackTimeString: `${min < 10
        ? '0' + min
        : min}:${sec < 10
          ? '0' + sec
          : sec}`,
      trackTimeSec: Math.ceil(this.state.currentTrack.duration)
    })
  }

  getCurrentTrackTime = () => {
    let currentTime = this.state.currentTrack.currentTime;
    let min = (Math.floor(currentTime / 60));
    let sec = Math.floor(currentTime - min * 60);
    this.setState({
      currentTrackTime: `${min < 10
        ? '0' + min
        : min}:${sec < 10
          ? '0' + sec
          : sec}`
    });
  }

  changeTimeInPlayingTrack = (event, value) => {
    this.state.currentTrack.currentTime = value;
  }

  changeVolume = (event, value) => {
    this.state.currentTrack.volume = value;
  }

  handleDialogTrackOpen = (idDialogTrack) => {
    this.props.songsActions.openDialogTrack(idDialogTrack);
  }

  render() {
    let logoClasses = classNames('floatDiv', 'logoSong');
    let nameClasses = classNames('floatDiv', 'nameSong');
    let controlsClasses = classNames('floatDiv', 'controlsSong');
    let progressClasses = classNames('floatDiv', 'progressSong');
    let timeClasses = classNames('floatDiv', 'timeSong');
    let additIconsClasses = classNames('floatDiv', 'additIconsSong');
    let progressVoiceClasses = classNames('floatDiv', 'progressVoiceSong');

    return (
      <div className="Player">
        <div className="container">
          <div className={logoClasses}><img src={this.props.tracks.arraySongs[this.props.player.trackIndex].urlImg} alt="icon"/></div>
          <div className={nameClasses}>
            <p className="songTitle" onClick={() => this.handleDialogTrackOpen(this.props.player.trackIndex)} title={this.props.tracks.arraySongs[this.props.player.trackIndex].name}>{this.props.tracks.arraySongs[this.props.player.trackIndex].name}</p>
            <p className="songCtg">{this.props.tracks.arrayCategories[this.props.player.trackIndexCategory].name}</p>
          </div>
          <div className={controlsClasses}>
            <MuiThemeProvider>
              <PreviousIcon onClick={this.playerClickPrevious} color='#CCC' viewBox="0 0 25 25" style={{
                marginLeft: '20px',
                cursor: 'pointer'
              }}/>
            </MuiThemeProvider>
            <MuiThemeProvider>
              {this.props.player.isPlayingNow
                ? (<PauseIcon onClick={this.playerClickPause} color='#CCC' viewBox="0 0 25 25" style={{
                  marginLeft: '15px',
                  cursor: 'pointer'
                }}/>)
                : (<PlayIcon onClick={this.playerClickPlay} color='#CCC' viewBox="0 0 25 25" style={{
                  marginLeft: '15px',
                  cursor: 'pointer'
                }}/>)}
            </MuiThemeProvider>
            <MuiThemeProvider>
              <NextIcon onClick={this.playerClickNext} color='#CCC' viewBox="0 0 25 25" style={{
                marginLeft: '15px',
                marginRight: '15px',
                cursor: 'pointer'
              }}/>
            </MuiThemeProvider>
          </div>
          <div className={progressClasses}>
            <MuiThemeProvider>
              <Slider onChange={this.changeTimeInPlayingTrack} sliderStyle={{
                marginTop: '8px',
                marginBottom: '0'
              }} min={0} max={this.state.trackTimeSec} defaultValue={0} value={this.state.currentTrack.currentTime}/>
            </MuiThemeProvider>
          </div>
          <div className={timeClasses}>
            {this.state.currentTrackTime}
            / {this.state.trackTimeString}
          </div>
          <div className={additIconsClasses}>
            <MuiThemeProvider>
              <VolumeIcon color='#CCC' viewBox="0 0 25 25"/>
            </MuiThemeProvider>
          </div>
          <div className={progressVoiceClasses}>
            <MuiThemeProvider>
              <Slider onChange={this.changeVolume} sliderStyle={{
                marginTop: '8px',
                marginBottom: '0'
              }} min={0.0} max={1.0} defaultValue={0.5}/>
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {player: state.player, tracks: state.tracks}
}

const mapDispatchToProps = (dispatch) => {
  return {
    playerActions: bindActionCreators(playerActions, dispatch),
    songsActions: bindActionCreators(songsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
