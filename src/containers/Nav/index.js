import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FavouriteIcon from 'material-ui/svg-icons/action/favorite';
import ResentsIcon from 'material-ui/svg-icons/action/restore';
import HeadsetIcon from 'material-ui/svg-icons/hardware/headset';
import FlatButton from 'material-ui/FlatButton';

var classNames = require('classnames');

const navStyles = {
  borderStyle: {
    borderRight: '1px solid #F4F4F4',
    width: '12.2%'
  },
  borderLeftStyle: {
    borderLeft: '1px solid #F4F4F4',
    borderRight: '1px solid #F4F4F4',
    width: '12.2%'
  },
  navButton: {
    width: '13%'
  },
  navButtonActiveTab: {
    borderBottom: '3px solid #00BCD4',
    width: '13%'
  },
  borderLeftStyleActiveTab: {
    borderBottom: '3px solid #00BCD4',
    borderLeft: '1px solid #F4F4F4',
    borderRight: '1px solid #F4F4F4',
    width: '12.2%'
  },
  borderStyleActiveTab: {
    borderBottom: '3px solid #00BCD4',
    borderRight: '1px solid #F4F4F4',
    width: '12.2%'
  }

}

const Nav = ({pathname}) => {

  let navClasses = classNames('nav', 'nav-tabs');

  return (
    <div className='Nav'>
      <div className='container'>
        <div className='row'>
          <div className="col-md-12">
            <MuiThemeProvider>
              <Link to="/recents">
                <RaisedButton
                  style={pathname == '/recents' ? navStyles.navButtonActiveTab : navStyles.navButton}
                  label="Recents"
                  labelPosition="after"
                  icon={<ResentsIcon />}
                />
              </Link>
            </MuiThemeProvider>
            <MuiThemeProvider>
              <Link to="/favorites">
                <RaisedButton
                  style={pathname == '/favorites' ? navStyles.navButtonActiveTab : navStyles.navButton}
                  label="Favorites"
                  labelPosition="after"
                  icon={<FavouriteIcon />}
                />
              </Link>
            </MuiThemeProvider>
            <MuiThemeProvider>
              <Link to="/popular">
                <RaisedButton
                  style={pathname == '/popular' ? navStyles.navButtonActiveTab : navStyles.navButton}
                  label="Listenings"
                  labelPosition="after"
                  icon={<HeadsetIcon />}
                />
              </Link>
            </MuiThemeProvider>
            <MuiThemeProvider>
              <Link to="/trance">
                <RaisedButton label="Trance" style={pathname == '/trance' ? navStyles.borderLeftStyleActiveTab : navStyles.borderLeftStyle} />
              </Link>
            </MuiThemeProvider>
            <MuiThemeProvider>
              <Link to="/chillout">
                <RaisedButton label="Chillout" style={pathname == '/chillout' ? navStyles.borderStyleActiveTab : navStyles.borderStyle} />
              </Link>
            </MuiThemeProvider>
            <MuiThemeProvider>
              <RaisedButton label="House" style={pathname == '/house' ? navStyles.borderStyleActiveTab : navStyles.borderStyle} />
            </MuiThemeProvider>
            <MuiThemeProvider>
              <RaisedButton label="Dubstep" style={pathname == '/dubstep' ? navStyles.borderStyleActiveTab : navStyles.borderStyle} />
            </MuiThemeProvider>
            <MuiThemeProvider>
              <RaisedButton label="Deep" style={pathname == '/deep' ? navStyles.borderStyleActiveTab : navStyles.borderStyle} />
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );

};

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

// class App extends Component{
//
//   // componentWillMount(){
//   //     console.log("componentWillMount");
//   //     this.props.songsActions.getTracks();
//   // }
//
//   render(){
//     var buttonClasses = classNames('btn', 'btn-default');
//
//     return (
//       <div className='row'>
//         <div className="col-md-2">col-md-2</div>
//         <div className="col-md-6">col-md-6</div>
//         <div className="col-md-4">col-md-4</div>
//       </div>
//       // <div className="App">
//       //   <ul>
//       //     <button className={buttonClasses} type="submit">Button</button>
//       //     {this.props.tracks.map((track, index) =>
//       //       <li key={index}>
//       //         {track.name}
//       //       </li>
//       //     )}
//       //     <button onClick={this.props.songsActions.getTracks}>getTracks</button>
//       //     <h1>{this.props.fetching ? 'REQUEST' : ''}</h1>
//       //   </ul>
//       // </div>
//     )
//   }
//
// }
//
// const mapStateToProps = (state, ownProps) => {
//   return {
//     tracks: state.tracks.songs,
//     fetching: state.tracks.fetching,
//     ownProps
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     songsActions: bindActionCreators(songsActions, dispatch)
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(App);
