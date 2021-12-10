import React,{ useContext  } from 'react';
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import img from '../../images/actor-profile-placeholder.png'
import { DataContext } from "../../contexts/dataContext";

const useStyles = makeStyles({
    card: { maxWidth: 345 },
    media: { height: 300 },
    avatar: {
        backgroundColor: "rgb(255, 0, 0)",
    },
});
  
export default function ActorCard({actor,action}) {
    const classes = useStyles();
    const {likes}  = useContext(DataContext);
    if (likes.find((id) => id === actor.id)) {
        actor.like = true;
    } else {
        actor.like = false
    }

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={
                    actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                        : img
                }
            />

            <CardHeader
                className={classes.header}
                avatar={
                    actor.like ? (
                        <Avatar className={classes.avatar}>
                            <ThumbUpIcon />
                        </Avatar>
                    ) : null
                }
                title={
                    <Typography variant="h5" component="p">
                        {actor.name}{" "}
                    </Typography>
                }
            />

            <CardContent>
                {/* <Typography variant="body2" color="text.secondary">
                    Birthday: {actor.birthday}
                </Typography> */}
                <Typography variant="body2">
                    Popularity: {actor.popularity}
                </Typography>
            </CardContent>

            <CardActions>
                {action(actor)}
                <Link to={`/actors/${actor.id}`}>
                    <Button size="small">
                        Learn More
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}