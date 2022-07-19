import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/MyProvider';
import Login from './pages/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods" component={ Recipes } />
        <Route path="/foods/:id" component={ Recipes } />
        <Route path="/foods/:id/in-progress" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="/drinks/:id" component={ Recipes } />
        <Route path="/drinks/:id/in-progress" component={ Recipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </Provider>
  );
}

export default App;
