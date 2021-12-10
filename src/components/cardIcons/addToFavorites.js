import React, { useContext } from "react";
import { DataContext } from "../../contexts/dataContext";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Tooltip from '@material-ui/core/Tooltip';

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(DataContext);

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    context.addToFavorites(movie);
  };
  return (
    <Tooltip title="Add to favourites">
      <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
        <FavoriteIcon color="primary" fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default AddToFavoritesIcon;