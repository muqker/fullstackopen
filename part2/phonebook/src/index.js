import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios'

axios.get('http://localhost:3001/notes').then(response => {
  console.log(response.data)
})

ReactDOM.render(<App />, document.getElementById('root'))
