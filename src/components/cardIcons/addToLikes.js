import React, { useContext } from "react";
import { DataContext } from "../../contexts/dataContext";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const AddToLikesIcon = ({ actor }) => {
    const context = useContext(DataContext);
  
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