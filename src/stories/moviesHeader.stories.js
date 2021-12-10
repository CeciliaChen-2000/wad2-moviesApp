import React from "react";
import MoviesHeader from "../components/headerMovieList";
import { MemoryRouter } from "react-router";
import DataContextProvider from "../contexts/dataContext";

export default {
  title: "Home Page/MoviePageHeader",
  component: MoviesHeader,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <DataContextProvider>{Story()}</DataContextProvider>,
  ],
};

export const Basic = () => <MoviesHeader title="Discover Movies" />;

Basic.storyName = "Default";
