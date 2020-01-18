import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import {Card, Col, Row} from 'react-materialize';

import Nav from './navbar/navbar';
import Home from './components/home/home';

import './App.scss';

class App extends Component {
  render(){  
  return (
    <div> 
      <Nav />
      <div className = "container" >
        <Router>
          <Switch>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>);
  }
}

export default App;
