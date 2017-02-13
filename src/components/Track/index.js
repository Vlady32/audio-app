import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FavouriteIcon from 'material-ui/svg-icons/action/favorite';

import './Track.less';

const Track = ({marginLeftSize}) => {

  return (
    <div className="songCard" style={{marginLeft: marginLeftSize}}>
      <div className="songImg" style={{backgroundImage: "url('img/armin.jpg')"}}></div>
      <div className="songBottomLine">
        <div className="songIcon"><img src="img/icon.jpg" alt="icon"/></div>
        <div className="songName">
          <p className="songTitle" title="Armin van buuren - Burned with Desire">Armin van buuren - Burned with Desire</p>
          <p className="songCtg">Trance</p>
        </div>
        <div className="songLike">
          <MuiThemeProvider>
            <FavouriteIcon color='#CCC' viewBox="0 0 40 40"/>
          </MuiThemeProvider>
        </div>
      </div>
    </div>
  );

}

export default Track;
