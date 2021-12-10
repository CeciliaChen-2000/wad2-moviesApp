import React, { useState } from "react";

export const DataContext = React.createContext(null);

const DataContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} ) 
  const [favorites, setFavorites] = useState( [] )
  const [playlist, setPlaylist] = useState([]);
  const [likes, setLikes] = useState( [] )

  //Add an actor you like into the Likes list
  const addToLikes = (actor) => {
    let newLikes = [];
    if (!likes.includes(actor.id)) {
      newLikes = [...likes, actor.id];
    } else{
      newLikes = likes;
    }
    setLikes(newLikes)
  };
  //Remove an actor from the Likes list
  const removeFromLikes = (actor) => {
    setLikes( likes.filter(
      (aId) => aId !== actor.id
    ) )
  };

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    } else{
      newFavorites = favorites;
    }
    setFavorites(newFavorites)
  };
  // We will use this function in a later section
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addToPlaylist = (movie) => {
    let newPlaylist = [];
    if (!playlist.includes(movie.id)) {
      newPlaylist = [...playlist, movie.id];
    } else {
      newPlaylist = playlist;
    }
    setPlaylist(newPlaylist)
  };
  const removeFromPlaylist = (movie) => {
    setPlaylist( playlist.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  return (
    <DataContext.Provider
      value={{
        favorites,
        playlist,
        likes,
        addToLikes,
        removeFromLikes,
        addToFavorites,
        removeFromFavorites,
        addToPlaylist,
        removeFromPlaylist,
        addReview,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;