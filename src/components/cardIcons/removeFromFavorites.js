import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataContext } from "../../contexts/dataContext";
import Tooltip from '@material-ui/core/Tooltip';

const RemoveFromFavoritesIcon = ({ movie }) => {
  const context = useContext(DataContext);

  const handleRemoveFromFavorites = (e) => {
    e.preventDefault();
    context.removeFromFavorites(movie);
  };
  return (
    <Tooltip title="Delete">
      <IconButton
        aria-label="remove from favorites"
        onClick={handleRemoveFromFavorites}
      >
        <DeleteIcon color="primary" fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default RemoveFromFavoritesIcon;