import React, { Component } from 'react';
import logo from './logo.svg';
import AddCall from './add-call.component/add-call.component';
import CallsList from './calls-list.component/calls-list.component';
import NextCall from './next-call.component/next-call.component';
import './App.css';

const styles = {
    app: {
        display : 'grid',
        gridTemplateColumns: '300px 2fr',
        maxWidth: '990px',
        margin: '0 auto',
        width: '100%',
        height: '100%',
        gridColumnGap: '16px',
        paddingTop: '30px'
    }
};


class App extends Component {
  render() {
    return (
      <div style={styles.app}>
          <NextCall />
          <div>
              <AddCall />
              <CallsList />
          </div>
      </div>
    );
  }
}

export default App;
