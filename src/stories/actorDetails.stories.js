import React from "react";
import ActorDetails from "../components/actorDetails";
import SampleActor from "./sampleActorData";
import { MemoryRouter } from "react-router";
import DataContextProvider from "../contexts/dataContext";

export default {
  title: "Actor Details Page/ActorDetails",
  component: ActorDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <DataContextProvider>{Story()}</DataContextProvider>,
  ],
};

export const Basic = () => <ActorDetails actor={SampleActor} />;

Basic.storyName = "Default";
