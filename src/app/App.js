import React, {Component} from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';

import Nav from './navbar/navbar';
import Home from './components/home/home';
import Note from './components/note/note';
import NewNote from './components/newNote/newNote';

import './App.scss';

class App extends Component {
  render(){  
  return (
    <div> 
      <Nav />
      <div className = "container" >
        <Router>
          <Switch>
            <Route path="/notes" component={Home} />
            <Route path="/note/create" component={NewNote}/>
            <Route path="/note/:noteId" component={Note}/>
          </Switch>
        </Router>
      </div>
    </div>);
  }
}

export default App;
