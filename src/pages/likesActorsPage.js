import React, { useContext } from "react";
import PageTemplate from "../components/templateActorListPage";
import { DataContext } from "../contexts/dataContext";
import { useQueries } from "react-query";
import { getActor } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromLikes from "../components/cardIcons/removeFromLikes";


const LikesActorsPage = () => {
  const {likes: actorIds } = useContext(DataContext);

  // Create an array of queries and run in parallel.
  const likesActorQueries = useQueries(
    actorIds.map((actorId) => {
      return {
        queryKey: ["actor", { id: actorId }],
        queryFn: getActor,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = likesActorQueries.find((a) => a.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }
  const actors = likesActorQueries.map((q) => {
    // q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });
  // const toDo = () => true;

  return (
    <PageTemplate
      title="Liked Actors"
      actors={actors}
      action={(actor) => {
        return (
          <>
            <RemoveFromLikes actor={actor} />
          </>
        );
      }}
    />
  );
};

export default LikesActorsPage;