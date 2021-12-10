import React from "react";
import Header from "../headerList";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        padding: "20px",
    },
});

function AuthPageTemplate({title, action}){
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Header title={title} />
            </Grid>
            <Grid item container spacing={5}>
                {action}
            </Grid>
        </Grid>
    );
}
export default AuthPageTemplate