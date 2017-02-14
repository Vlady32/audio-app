import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router';

class User extends Component{

  componentWillMount(){
    if(this.props.auth.status == 'guest'){
      window.location.href = '/';
    }
  }

  render(){
    return (
      <div className="User">
      {this.props.auth.status == 'admin' ? (
        <p>admin</p>
      ) : (
        <p>user</p>
      )}
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
