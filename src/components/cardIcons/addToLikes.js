import React, { useContext } from "react";
import { DataContext } from "../../contexts/dataContext";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Tooltip from '@material-ui/core/Tooltip';

const AddToLikesIcon = ({ actor }) => {
    const context = useContext(DataContext);
  
    const handleAddToLikes = (e) => {
      e.preventDefault();
      context.addToLikes(actor);
    };
    return (
      <Tooltip title="Add to likes">
        <IconButton aria-label="add to likes" onClick={handleAddToLikes}>
          <ThumbUpIcon color="primary" fontSize="large" />
        </IconButton>
      </Tooltip>
    );
  };
  
  export default AddToLikesIcon;