import React from "react";
import PageTemplate from "../components/templateActorListPage";
import AddToLikesIcon from '../components/cardIcons/addToLikes'
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getCredits} from '../api/tmdb-api'

const MovieCreditsPage = (props) => {
  const todoId = props.match.params.id; //传过来的id
  const {  data, error, isLoading, isError }  = useQuery(['Credits', {id: todoId}], getCredits)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const actors = data.cast;

  return (
    <PageTemplate
      title="Related Credits"
      actors={actors}
      action={(actor) => {
        return <AddToLikesIcon actor={actor} />
      }}
    />
  );
};

export default MovieCreditsPage;