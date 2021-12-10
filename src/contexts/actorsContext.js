import React, { useState } from "react";

export const ActorsContext = React.createContext(null);

const ActorsContextProvider = (props) => {
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

  return (
    <ActorsContext.Provider
      value={{
        likes,
        addToLikes,
        removeFromLikes,
      }}
    >
      {props.children}
    </ActorsContext.Provider>
  );
};

export default ActorsContextProvider;