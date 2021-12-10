import React from "react";
import ActorList from "../components/actorList";
import SampleActor from "./sampleActorData";
import { MemoryRouter } from "react-router";
import AddToLikesIcon from "../components/cardIcons/addToLikes";
import Grid from "@material-ui/core/Grid";
import ActorsContextProvider from "../contexts/actorsContext";

export default {
  title: "Home Page/ActorList",
  component: ActorList,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <ActorsContextProvider>{Story()}</ActorsContextProvider>,
  ],
};

export const Basic = () => {
  const actors = [
    { ...SampleActor, id: 1 },
    { ...SampleActor, id: 2 },
    { ...SampleActor, id: 3 },
    { ...SampleActor, id: 4 },
    { ...SampleActor, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <ActorList
        actors={actors}
        action={(actor) => <AddToLikesIcon actor={actor} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";
