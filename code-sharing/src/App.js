import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { ErrorCompo } from './components/ErrorCompo';
import { HomePage } from './components/HomePage';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={SignIn}/>
        <Route path='/signup' exact component={SignUp}/>
        <Route path='/homepage' exact component={HomePage}/>
        <Route path='*' component={ErrorCompo}/>  
      </Switch>
      </BrowserRouter>
  );
}

export default App;
