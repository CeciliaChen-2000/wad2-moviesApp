import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataContext } from "../../contexts/dataContext";
import Tooltip from '@material-ui/core/Tooltip';

const RemoveFromPlaylistIcon = ({ movie }) => {
  const context = useContext(DataContext);

  const handleRemoveFromPlaylist = (e) => {
    e.preventDefault();
    context.removeFromPlaylist(movie);
  };
  return (
    <Tooltip title="Delete">
      <IconButton
        aria-label="remove from playlist"
        onClick={handleRemoveFromPlaylist}
      >
        <DeleteIcon color="primary" fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default RemoveFromPlaylistIcon;