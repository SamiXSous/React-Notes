import React, { Component } from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize';
import './navbar.scss';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    }
  }

  render() {
    return (
      <Navbar
        alignLinks="right" brand={<a className="brand-logo" href="/"> Notes </a>}
        menuIcon={<Icon>menu</Icon>}
        options={
          {
            draggable: true,
            edge: 'left',
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 200,
            preventScrolling: true
          }
        }>
        <NavItem href="/note/create" >Create New Note</NavItem>
      </Navbar>
    );
  }
}

export default Nav;
