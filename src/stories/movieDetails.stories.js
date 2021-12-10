import React from "react";
import MovieDetails from "../components/movieDetails";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import DataContextProvider from "../contexts/dataContext";

export default {
  title: "Movie Details Page/MovieDetails",
  component: MovieDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <DataContextProvider>{Story()}</DataContextProvider>,
  ],
};

export const Basic = () => <MovieDetails movie={SampleMovie} />;

Basic.storyName = "Default";
