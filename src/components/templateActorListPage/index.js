import React, { useState } from "react";
import Header from "../headerList";
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
  const [switchOn,setSwitchOn] = useState(true);

  let displayedActors = switchOn ?
    actors
      .filter((a) => {
        return a.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
      }) :
    actors
      .filter((a) => {
        return a.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
      }).sort((a, b) => { return a.popularity - b.popularity });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setSwitchOn(!switchOn);
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
            onSwitchChange={handleChange}
            titleFilter={nameFilter}
          />
        </Grid>
        <ActorList action={action} actors={displayedActors}></ActorList>
      </Grid>
    </Grid>
  );
}
export default ActorListPageTemplate;