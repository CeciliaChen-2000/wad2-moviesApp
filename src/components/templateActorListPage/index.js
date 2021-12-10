import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterAndSortCard from "../filterAndSortActorsCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ActorList from "../actorList";

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
});

function ActorListPageTemplate({ actors, title, action }) {
  const classes = useStyles();
  const [nameFilter, setNameFilter] = useState("");

  let displayedActors = actors
    .filter((a) => {
      return a.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })

    console.log(displayedActors);
  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterAndSortCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
          />
        </Grid>
        <ActorList action={action} actors={displayedActors}></ActorList>
      </Grid>
    </Grid>
  );
}
export default ActorListPageTemplate;