import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomeView from './views/HomeView';
import MoviesView from './views/MoviesView';
import MovieDetailsView from './views/MovieDetailsView';
import Header from './components/Header';
import Navigation from './components/Navigation';
import routes from './routes';

const App = () => {
  return (
    <>
      <Header>
        <Navigation />
      </Header>

      <Switch>
        <Route exact path={routes.home} component={HomeView} />
        <Route path={routes.movieDetails} component={MovieDetailsView} />
        <Route path={routes.movies} component={MoviesView} />
        <Redirect to={routes.home} />
      </Switch>
    </>
  );
};

export default App;
