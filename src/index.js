import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import DataContextProvider from "./contexts/dataContext";

import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";

import PrivateRoute from "./route/privateRoute";
import AuthProvider from "./contexts/authContext";

const SiteHeader = lazy(() => import("./components/siteHeader"));
const HomePage = lazy(() => import("./pages/homePage"));
const MoviePage = lazy(() => import("./pages/movieDetailsPage"));
const MovieReviewPage = lazy(() => import("./pages/movieReviewPage"));
const AddMovieReviewPage = lazy(() => import("./pages/addMovieReviewPage"));

const RecommendationsMoviesPage = lazy(() => import("./pages/recommendationsMoviesPage"));
const UpcomingMoviesPage = lazy(() => import("./pages/upcomingMoviesPage"));
const NowPlayingMoviesPage = lazy(() => import("./pages/nowPlayingMoviesPage"));
const TopRatedMoviesPage = lazy(() => import("./pages/topRatedMoviesPage"));
const PopularMoviesPage = lazy(() => import("./pages/popularMoviesPage"));

const PlaylistMoviesPage = lazy(() => import("./pages/playlistMoviesPage"));
const FavoriteMoviesPage = lazy(() => import("./pages/favoriteMoviesPage"));
const LikesActorsPage = lazy(() => import("./pages/likesActorsPage"));

const MovieCreditsPage = lazy(() => import("./pages/movieCreditsPage"));
const ActorPage = lazy(() => import("./pages/actorDetailsPage"));
const ActorsPage = lazy(() => import("./pages/actorsPage"));
const ActorStarringMoviesPage = lazy(() => import("./pages/actorStarringMoviesPage"));



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
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <DataContextProvider>
          <Suspense fallback={<h1>Loading page</h1>}>
            <AuthProvider>

              <SiteHeader />
              
              <Switch>
                <Route exact path="/reviews/form" component={AddMovieReviewPage} />
                <Route path="/reviews/:id" component={MovieReviewPage} />

                <PrivateRoute exact path="/movies/upcoming" component={UpcomingMoviesPage} />
                <Route exact path="/movies/nowPlaying" component={NowPlayingMoviesPage} />
                <Route exact path="/movies/topRated" component={TopRatedMoviesPage} />
                <Route exact path="/movies/popular" component={PopularMoviesPage} />

                <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
                <Route exact path="/movies/playlist" component={PlaylistMoviesPage} />
                <Route exact path="/actors/likes" component={LikesActorsPage} />

                <Route exact path="/movies/:id/credits" component={MovieCreditsPage} />
                <PrivateRoute exact path="/movies/:id/recommendations" component={RecommendationsMoviesPage} />
                <PrivateRoute exact path="/movies/:id" component={MoviePage} />

                <Route exact path="/actors/:id/movies" component={ActorStarringMoviesPage} />
                <Route exact path="/actors/:id" component={ActorPage} />
                {/* <Route exact path="/actors" component={ActorsPage} /> */}
                <PrivateRoute exact path="/actors" component={ActorsPage} />

                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/signup" component={SignupPage} />
                <PrivateRoute exact path="/" component={HomePage} />
                <Redirect from="*" to="/" />
              </Switch>
            </AuthProvider>

          </Suspense>

        </DataContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));