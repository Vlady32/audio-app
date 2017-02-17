import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory, Redirect} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './containers/App/';
import User from './containers/User/';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './store/configureStore';

const history = syncHistoryWithStore(hashHistory, store);

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>
    <Redirect from="/" to="recents"/>
    <Route path="/" component={App}>
      <Route path="recents" component={App}/>
      <Route path="favorites" component={App}/>
      <Route path="popular" component={App}/>
      <Route path="trance" component={App}/>
      <Route path="chillout" component={App}/>
      <Route path="house" component={App}/>
      <Route path="dubstep" component={App}/>
      <Route path="lounge" component={App}/>
    </Route>
    <Route path="user/:userId" component={User}/>
  </Router>
</Provider>, document.getElementById('root'))
