import React, { Component } from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';

import Nav from './navbar/navbar';
import Home from './components/home/home';
import Note from './components/note/note';
import NewNote from './components/newNote/newNote';
import EditNote from './components/editNote/editNote';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="container" >
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/note/create" component={NewNote} />
              <Route exact path="/note/:noteId" component={Note} />
              <Route exact path="/note/:noteId/edit" component={EditNote} />
            </Switch>
          </Router>
        </div>
      </div>);
  }
}

export default App;
