import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import PlaylistAddIcon from '../components/cardIcons/addToPlaylist'
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import { getActors } from "../api/tmdb-api";

const ActorStarringMoviesPage = (props) => {
  const todoId = props.match.params.id; //传过来的id
  const {  data , error, isLoading, isError }  = useQuery(['StarringMovies', {id: todoId}], getActors);
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const actors = data.results; //get all actors
  const actor = actors.filter(a => a.id == todoId)[0]; //get the actor filtered by id
  const starringMovies = actor.known_for.filter(m => m.title !== undefined); //remove the TV part

  console.log(starringMovies);
  return (
    <PageTemplate
      title={`${actor.name} - Starring Movies`}
      movies={starringMovies}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />
      }}
    />
  );
};

export default ActorStarringMoviesPage;