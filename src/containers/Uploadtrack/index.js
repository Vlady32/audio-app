import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dropzone from 'react-dropzone';

import "./UploadTrack.less";

class UploadTrack extends Component {

  state = {
    valueCategory: 0,
    imgFile: '',
    trackFile: '',
  }

  handleCategoryChange = (event, index, value) => {
    this.setState({valueCategory: value});
  }

  onDropImg = (acceptedFiles, rejectedFiles) => {
    console.log(acceptedFiles[0]);
    this.setState({imgFile: acceptedFiles[0]});
  }

  render(){
    return (
     <div className='addingTrack'>
       <div className="categories">
         <SelectField
          floatingLabelText="Category"
          value={this.state.valueCategory}
          onChange={this.handleCategoryChange}
         >
           {
             this.props.tracks.arrayCategories.map((category, index) =>
               <MenuItem style={{textTransform: 'capitalize'}} key={Date.now() + index} value={category._id} primaryText={category.name} />
             )
           }
         </SelectField>
       </div>
       <div>
        <Dropzone className="dropZone" onDrop={this.onDropImg} multiple={false} accept="image/*">
          <div className="dropZoneDescription">Drop image here, or click to select one to upload</div>
        </Dropzone>
        {this.state.imgFile ? (
          <div className="previewImg">
            <img src={this.state.imgFile.preview} alt="Preview image"/>
          </div>
        ) : ''}
      </div>
    </div>
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadTrack);
