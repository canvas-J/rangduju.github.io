import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./common/common.css";
// import App from './App';
import Head from './components/head';
import Foot from './components/foot';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Head />, document.getElementById('head'));

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(<Foot />, document.getElementById('foot'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
