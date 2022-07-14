import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/MyProvider';
import Login from './pages/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods" component={ Foods } />
        <Route path="/foods/:id" component={ Foods } />
        <Route path="/foods/:id/in-progress" component={ Foods } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/drinks/:id" component={ Drinks } />
        <Route path="/drinks/:id/in-progress" component={ Drinks } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </Provider>
  );
}

export default App;
