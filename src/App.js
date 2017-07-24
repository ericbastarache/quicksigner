import React, { Component } from 'react';
import './App.css';

import Header from './components/Header/Header';
import SignatureContainer from './containers/SignatureContainer';

class App extends Component {
  render() {
    return (
      <div>
        <Header
          headerText="Quick Signature"
          />
        <SignatureContainer />
      </div>
    );
  }
}

export default App;
