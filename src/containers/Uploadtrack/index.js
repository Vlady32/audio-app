import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Dropzone from 'react-dropzone';

import * as songsActions from '../../actions/SongsActions';

import "./UploadTrack.less";

class UploadTrack extends Component {

  state = {
    valueCategory: 0,
    imgFile: '',
    trackFile: '',
    nameTrack: ''
  }

  handleCategoryChange = (event, index, value) => {
    this.setState({valueCategory: value});
  }

  handleNameTrackChange = (event, value) => {
    this.setState({nameTrack: value});
  }

  onDropImg = (acceptedFiles, rejectedFiles) => {
    this.setState({imgFile: acceptedFiles[0]});
  }

  onDropTrack = (acceptedFiles, rejectedFiles) => {
    this.setState({trackFile: acceptedFiles[0]});
  }

  uploadTrack = () => {
    this.props.songsActions.uploadTrack(this.state.nameTrack, this.state.valueCategory, this.state.imgFile, this.state.trackFile);
  };

  handleCloseDialog = () => {
    this.props.songsActions.closeUploadDialogTrack();
  };

  render(){

    const styles = {
      button: {
        margin: '12px'
      },
      trackInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      }
    }

    const buttonActions = [
      <RaisedButton
        label="Cancel"
        secondary={true}
        style={{margin: 12}}
        onTouchTap={this.handleCloseDialog}
      />,
      <RaisedButton
        label="Add track"
        primary={true}
        style={{margin: 12}}
        onTouchTap={this.uploadTrack}
        disabled={this.state.valueCategory == 0 || !this.state.trackFile || !this.state.nameTrack}
      />
    ];

    return (
      <Dialog
       title="Upload a track"
       actions={buttonActions}
       modal={false}
       open={this.props.tracks.isOpenedUploadDialogTrack}
       onRequestClose={this.handleCloseDialog}
       contentStyle={{width: '550px'}}
     >
       <div className='addingTrack'>
         <div className="imgTrack">
          <Dropzone className="dropZone" onDrop={this.onDropImg} multiple={false} accept="image/*">
            <div className="dropZoneDescription">Drop image here, or click to select one to upload</div>
          </Dropzone>
          {this.state.imgFile ? (
            <div className="previewImg">
              <img src={this.state.imgFile.preview} alt="Preview image"/>
            </div>
          ) : ''}
        </div>

        <div className="fieldsTrack">
           <TextField
             hintText="Name of track"
             floatingLabelText="Name of track"
             errorText={this.state.nameTrack == '' ? "This field is required" : ''}
             onChange={this.handleNameTrackChange}
           />
           <div className="categories">
             <SelectField
              floatingLabelText="Category"
              value={this.state.valueCategory}
              onChange={this.handleCategoryChange}
              errorText={this.state.valueCategory == 0 && 'Should be chosen'}
              style={{marginTop: '-20px'}}
             >
               {
                 this.props.tracks.arrayCategories.map((category, index) =>
                   <MenuItem style={{textTransform: 'capitalize'}} key={Date.now() + index} value={category._id} primaryText={category.name} />
                 )
               }
             </SelectField>
           </div>
           <Dropzone className="dropZoneTrack" onDrop={this.onDropTrack} multiple={false} accept="audio/*">
             <div className="dropZoneTrackDescription">Drop track here, or click to select one to upload</div>
           </Dropzone>
           {this.state.trackFile ? (
             <div className="previewTrack">
               {this.state.trackFile.name}
             </div>
           ) : ''}
         </div>
      </div>
    </Dialog>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    tracks: state.tracks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    songsActions: bindActionCreators(songsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadTrack);
