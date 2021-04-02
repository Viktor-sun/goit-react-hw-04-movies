import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
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

const Spinner = (
  <Loader
    type="ThreeDots"
    color="#56b5b8"
    height={50}
    width={80}
    style={{ display: 'flex', justifyContent: 'center' }}
  />
);

const App = () => {
  return (
    <>
      <Header>
        <Navigation />
      </Header>

      <Suspense fallback={Spinner}>
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
