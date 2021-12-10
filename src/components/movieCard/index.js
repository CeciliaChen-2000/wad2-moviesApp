import React, { useContext  } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CalendarIcon from "@material-ui/icons/CalendarTodayTwoTone";
import StarRateIcon from "@material-ui/icons/StarRate";
// import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import img from '../../images/film-poster-placeholder.png'
import { DataContext } from "../../contexts/dataContext";

const useStyles = makeStyles({
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
  tip:{
    color:"rgb(200,30,30)",
    fontSize:18,
    marginBottom:-40
  }
});

export default function MovieCard({ movie, action }) {
  const classes = useStyles();
  const { favorites } = useContext(DataContext);
  const { playlist  } = useContext(DataContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }
  // const handleAddToFavorite = (e) => {
  //   e.preventDefault();
  //   addToFavorites(movie);
  // };

  //Add to playlist status check and event
  if(playlist.find((id) => id === movie.id)) {
    movie.isInPlaylist = true;
  }else{
    movie.isInPlaylist = false;
  }
  // const handleAddToPlaylist = (e) => {
  //   e.preventDefault();
  //   addToPlaylist(movie);
  // };

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        avatar={
          movie.favorite ? (
            <Avatar className={classes.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        className={classes.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
            <Typography variant="h6" component="p" className={classes.tip}>
              {movie.isInPlaylist ? <>Successfully added in playlist!</> : <></>}
            </Typography>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}