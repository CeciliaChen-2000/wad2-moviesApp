import React, { useContext } from "react";
import { DataContext } from "../../contexts/dataContext";
import IconButton from "@material-ui/core/IconButton";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Tooltip from '@material-ui/core/Tooltip';

const AddToPlaylistIcon = ({ movie }) => {
  const context = useContext(DataContext);

  const handleAddToPlaylist = (e) => {
    e.preventDefault();
    context.addToPlaylist(movie);
  };
  return (
    <Tooltip title="Add to playlist">
      <IconButton aria-label="add to playlist" onClick={handleAddToPlaylist}>
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default AddToPlaylistIcon;