import React from "react";
import ActorCard from "../components/actorCard";
import SampleActor from "./sampleActorData"; //Sample data about an actor
import { MemoryRouter } from "react-router";
import DataContextProvider from "../contexts/dataContext";
import AddToLikesIcon from "../components/cardIcons/addToLikes";

export default {
  title: "Home Page/ActorCard",
  component: ActorCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <DataContextProvider>{Story()}</DataContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <ActorCard
      actor={SampleActor}
      action={(actor) => <AddToLikesIcon actor={actor} />}
      taging={(actor) => null}
    />
  );
};
Basic.storyName = "Default";

export const Exceptional = () => {
  const sampleNoPoster = { ...SampleActor, profile_path: undefined };
  return (
    <ActorCard
      actor={sampleNoPoster}
      action={(actor) => <AddToLikesIcon actor={actor} />}
      taging={(actor) => null}
    />
  );
};
Exceptional.storyName = "exception";
