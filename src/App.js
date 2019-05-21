import React, { Component } from 'react';
import logo                 from './logo.svg';
import styles               from './App.module.css';
import Section              from './containers/section/section';
import axios                from 'axios';

// _appJsConfig

axios.defaults.baseURL = window.location.href;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['X-CSRF-Token'] = window.vigblat;
delete window.vigblat;

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <div className={styles['App-header']}>
          <img src={logo} className={styles["App-logo"]} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className={styles["App-intro"]}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Section />
      </div>
    );
  }
}

export default App;
