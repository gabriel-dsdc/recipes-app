import React from 'react';
import Provider from './context/MyProvider';
import Login from './components/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider>
      <Login />
    </Provider>
  );
}

export default App;
