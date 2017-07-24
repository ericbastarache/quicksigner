import React, { Component } from 'react';

class Header extends Component {
  render () {
    return (
      <h3 className="text-center">{this.props.headerText}</h3>
    );
  }
}

export default Header;
