import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import './App.css';

const App = () => {
  return (
    <>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </section>
    </>
  );
};

export default App;
