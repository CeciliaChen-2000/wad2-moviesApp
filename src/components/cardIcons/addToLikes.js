import React, { useContext } from "react";
import { ActorsContext } from "../../contexts/actorsContext";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const AddToLikesIcon = ({ actor }) => {
    const context = useContext(ActorsContext);
  
    const handleAddToLikes = (e) => {
      e.preventDefault();
      context.addToLikes(actor);
    };
    return (
      <IconButton aria-label="add to likes" onClick={handleAddToLikes}>
        <ThumbUpIcon color="primary" fontSize="large" />
      </IconButton>
    );
  };
  
  export default AddToLikesIcon;