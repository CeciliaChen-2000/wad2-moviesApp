import React from "react";
import Header from "../components/headerList";
import { MemoryRouter } from "react-router";
import DataContextProvider from "../contexts/dataContext";

export default {
  title: "Home Page/MoviePageHeader",
  component: Header,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <DataContextProvider>{Story()}</DataContextProvider>,
  ],
};

export const Basic = () => <Header title="Discover Movies" />;

Basic.storyName = "Default";
