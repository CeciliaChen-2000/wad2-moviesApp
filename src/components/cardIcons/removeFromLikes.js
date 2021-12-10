import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataContext } from "../../contexts/dataContext";
import Tooltip from '@material-ui/core/Tooltip';

const RemoveFromLikesIcon = ({ actor }) => {
  const context = useContext(DataContext);

  const handleRemoveFromLikes = (e) => {
    e.preventDefault();
    context.removeFromLikes(actor);
  };
  return (
    <Tooltip title="Delete">
      <IconButton
        aria-label="remove from likes"
        onClick={handleRemoveFromLikes}
      >
        <DeleteIcon color="primary" fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default RemoveFromLikesIcon;