import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import routes from './routes';

const HomeView = lazy(() =>
  import('./views/HomeView.js' /* webpackChunkName: "home-view" */),
);

const MoviesView = lazy(() =>
  import('./views/MoviesView.js' /* webpackChunkName: "movies-view" */),
);

const MovieDetailsView = lazy(() =>
  import(
    './views/MovieDetailsView.js' /* webpackChunkName: "movies-details-view" */
  ),
);

const App = () => {
  return (
    <>
      <Header>
        <Navigation />
      </Header>

      <Suspense fallback={<h1>load</h1>}>
        <Switch>
          <Route exact path={routes.home} component={HomeView} />
          <Route path={routes.movieDetails} component={MovieDetailsView} />
          <Route path={routes.movies} component={MoviesView} />
          <Redirect to={routes.home} />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
