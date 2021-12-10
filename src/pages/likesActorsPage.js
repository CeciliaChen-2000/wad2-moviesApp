import React, { useContext } from "react";
import PageTemplate from "../components/templateActorListPage";
import {DataContext} from "../contexts/dataContext";
import {useQueries} from "react-query";
import Spinner from '../components/spinner'
import {getActor} from '../api/tmdb-api'
import RemoveFromLikes from "../components/cardIcons/removeFromLikes";

const LikesActorsPage = () => {
  const {likes: actorIds } = useContext(DataContext);
  const likesActorsQueries = useQueries(
    actorIds.map((actorId) => {
      return {
        queryKey: ["likesActors", { id: actorId }],
        queryFn: getActor,
      };
    })
  );
  const isLoading = likesActorsQueries.find((a) => a.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }
  const actors = likesActorsQueries.map(q => q.data);

  return (
    <PageTemplate
      title="Liked Actors"
      actors={actors}
      action={(actor) => {
        return (
          <RemoveFromLikes actor={actor} />
        );
      }}
    />
  );
};

export default LikesActorsPage;