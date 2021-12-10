import React, { useState} from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        margin: 20,
    },
    content: {
        margin: 20,
        color: "rgb(50, 50, 50)",
        fontWeight: "100px",
        fontStyle: 'italic',
        fontSize: 17,
        lineHeight: 2
    }
}));

const ActorDetails = ({actor}) => {
    const classes = useStyles();
    return (
        <>
            <Typography variant="h4" component="h4" className={classes.title}>
                Introduction
            </Typography>
            
            <Typography variant="h6" component="p" className={classes.content}>
                Hometown: {actor.place_of_birth}
            </Typography>

            <Typography variant="h6" component="p" className={classes.content}>
                {actor.biography}
            </Typography>
        </>
    );
};
export default ActorDetails;