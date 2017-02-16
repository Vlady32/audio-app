import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import Dropzone from 'react-dropzone';

import * as songsActions from '../../actions/SongsActions';

import "./UploadChangeTrack.less";

class UploadChangeTrack extends Component {

  state = {
    valueCategory: 0,
    imgFile: '',
    trackFile: '',
    nameTrack: '',
    disabledButton: false
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.tracks.eventUploadChangeDialog == 'change'){
      this.setState({
        valueCategory: this.props.tracks.arrayCategories[this.props.tracks.arrayCategories.map((el) => el._id).indexOf(this.props.tracks.arraySongs[nextProps.tracks.idTrackForChange].category)]._id,
        imgFile: this.props.tracks.arraySongs[nextProps.tracks.idTrackForChange].urlImg,
        trackFile: this.props.tracks.arraySongs[nextProps.tracks.idTrackForChange].urlTrack,
        nameTrack: this.props.tracks.arraySongs[nextProps.tracks.idTrackForChange].name,
      })
    }
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
    this.setState({disabledButton: true});
    this.clearForm()
  };

  changeTrack = () => {
    this.props.songsActions.changeTrack(this.props.tracks.arraySongs[this.props.tracks.idTrackForChange]._id, this.state.nameTrack, this.state.valueCategory, this.state.imgFile, this.state.trackFile);
    this.setState({disabledButton: true});
  };

  deleteTrack = () => {
    this.props.songsActions.deleteTrack(this.props.tracks.arraySongs[this.props.tracks.idTrackForChange]._id);
    this.clearForm();
  }

  handleCloseDialog = () => {
    this.props.songsActions.closeUploadChangeDialogTrack();
    this.clearForm();
  };

  handleSnackbarClose = () => {
    this.props.songsActions.clearMessageUpload();
    this.setState({disabledButton: false});
  }

  clearForm = () => {
    this.setState({
      valueCategory: 0,
      imgFile: '',
      trackFile: '',
      nameTrack: ''
    })
  }

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
        label="Clear"
        style={{margin: 12}}
        onTouchTap={this.clearForm}
      />,
      <RaisedButton
        backgroundColor="#9E9E9E"
        label="Delete"
        style={{margin: 12}}
        disabled={this.props.tracks.eventUploadChangeDialog !== 'change'}
        onTouchTap={this.deleteTrack}
      />,
      <RaisedButton
        label="Cancel"
        secondary={true}
        style={{margin: 12}}
        onTouchTap={this.handleCloseDialog}
      />,
      <RaisedButton
        label= {this.props.tracks.eventUploadChangeDialog == 'upload' ? "Add track" : 'Save'}
        primary={true}
        style={{margin: 12}}
        onTouchTap={this.props.tracks.eventUploadChangeDialog == 'upload' ? this.uploadTrack : this.changeTrack}
        disabled={this.state.valueCategory == 0 || !this.state.trackFile || !this.state.nameTrack || this.state.disabledButton}
      />
    ];

    return (
      <Dialog
       title="Upload a track"
       actions={buttonActions}
       modal={false}
       open={this.props.tracks.isOpenedUploadChangeDialogTrack}
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
              <img src={this.state.imgFile.preview ? this.state.imgFile.preview : this.state.imgFile} alt="Preview image"/>
            </div>
          ) : ''}
        </div>

        <div className="fieldsTrack">
           <TextField
             hintText="Name of track"
             floatingLabelText="Name of track"
             errorText={this.state.nameTrack == '' ? "This field is required" : ''}
             onChange={this.handleNameTrackChange}
             value={this.state.nameTrack}
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
         {this.props.tracks.uploadingTrack ? <LinearProgress style={{top: '15px'}} mode="indeterminate" /> : ''}
      </div>
      <Snackbar
        open={this.props.tracks.uploadedTrackMessage ? true : false}
        message={this.props.tracks.uploadedTrackMessage}
        autoHideDuration={3000}
        onRequestClose={this.handleSnackbarClose}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadChangeTrack);
