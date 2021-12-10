import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { dataContext } from "../../contexts/dataContext";

const RemoveFromLikesIcon = ({ actor }) => {
  const context = useContext(dataContext);

  const handleRemoveFromLikes = (e) => {
    e.preventDefault();
    context.removeFromLikes(actor);
  };
  return (
    <IconButton
      aria-label="remove from likes"
      onClick={handleRemoveFromLikes}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromLikesIcon;