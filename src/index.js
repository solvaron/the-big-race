import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/';

axios.interceptors.request.use(request => {
    return request; //required unless we wanted to block the request
}, error => {
    console.log(error); //In Prod, log this to your server
    return Promise.reject(error); //Forwards the error to the catch method (if implemented) in any components
});

axios.interceptors.response.use(response => {
    return response; //required unless we wanted to block the response
}, error => {
        console.log(error); //In Prod, log this to your server
        return Promise.reject(error); //Forwards the error to the catch method (if implemented) in any components
})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
