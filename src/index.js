import AddMovieReviewPage from './pages/addMovieReviewPage'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import SiteHeader from './components/siteHeader';
import MovieReviewPage from "./pages/movieReviewPage";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
// import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage"; // NEW
import UpcomingMoviesPage from "./pages/upcomingMoviesPage"
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage"
import TopRatedMoviesPage from "./pages/topRatedMoviesPage"
import PopularMoviesPage from "./pages/popularMoviesPage"
import RecommendationsMoviesPage from "./pages/recommendationsMoviesPage"
import PlaylistMoviesPage from "./pages/playlistMoviesPage"

import ActorsPage from "./pages/actorsPage"
import LoginPage from "./pages/loginPage"
import SignupPage from "./pages/signupPage"

import DataContextProvider from "./contexts/dataContext";

import { FirebaseAppProvider } from 'reactfire';
import { useFirebaseApp } from 'reactfire';
import firebaseConfig from "./firebaseAuth/firebaseConfig";

//declare the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  const firebase = useFirebaseApp();
  console.log(firebase);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <DataContextProvider>
          {" "}
          <Switch>
            <Route exact path="/reviews/form" component={AddMovieReviewPage} />
            <Route path="/reviews/:id" component={MovieReviewPage} />

            <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} />
            <Route exact path="/movies/nowPlaying" component={NowPlayingMoviesPage} />
            <Route exact path="/movies/topRated" component={TopRatedMoviesPage} />
            <Route exact path="/movies/popular" component={PopularMoviesPage} />

            <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
            <Route exact path="/movies/playlist" component={PlaylistMoviesPage} />

            <Route path="/movies/:id/recommendations" component={RecommendationsMoviesPage} />
            <Route path="/movies/:id" component={MoviePage} />

            <Route path="/actors" component={ActorsPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route exact path="/" component={HomePage} />
            <Redirect from="*" to="/" />
          </Switch>
        </DataContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<FirebaseAppProvider firebaseConfig={firebaseConfig}><App /></FirebaseAppProvider>, document.getElementById("root"));