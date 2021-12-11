let movies;
const movieId =  335983; // The movie Venom id
let reviews;

describe("Navigation", () => {
  before(() => {
    //get movies
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        movies = response.results;
    });
    
    // get movie reviews
    cy.request(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${Cypress.env("TMDB_KEY")}`
    )
      .its("body")
      .then((response) => {
        reviews = response.results;
    });
  });

  beforeEach(() => {
    cy.visit("/");
  });  

  describe("From the home page", () => {
    it("should navigate to the movie details page and change browser URL", () => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
      cy.get("h3").contains(movies[0].title);
    });
  });


  describe("The site header", () => {
    describe("when the viewport is desktop scale", () => {
      it("should allow navigation to the Sign Up page from the link", () => {
        cy.get("header").find(".MuiToolbar-root").find("button").eq(0).click();
        cy.url().should("include", `/signup`);
        cy.get("h3").contains("Sign up");
      });
      it("should allow navigation to the Log In page from the link", () => {
        cy.get("header").find(".MuiToolbar-root").find("button").eq(1).click();
        cy.url().should("include", `/login`);
        cy.get("h3").contains("Log in");
      });
      it("should allow navigation to the home page from the link", () => {
        cy.get("header").find(".MuiToolbar-root").find("button").eq(3).click();
        cy.url().should("include", `/`);
        cy.get("h3").contains("Discover Movies");
      });
      it("should allow navigation to the Favourites page from the link", () => {
        cy.get("header").find(".MuiToolbar-root").find("button").eq(4).click();
        cy.url().should("include", `/favorites`);
        cy.get("h3").contains("Favourite Movies");
      });
      it("should allow navigation to the top rated movies page from the link", () => {
        cy.get("header").find(".MuiToolbar-root").find("button").eq(5).click();
        cy.url().should("include", `/movies/topRated`);
        cy.get("h3").contains("Top Rated Movies");
      });
      // it("should allow navigation to the popular movies page from the link", () => {
      //   cy.get("header").find(".MuiToolbar-root").find("button").eq(6).click();
      //   cy.url().should("include", `/movies/popular`);
      //   cy.get("h3").contains("Popular Movies");
      // });
      // it("should allow navigation to the now playing movies page from the link", () => {
      //   cy.get("header").find(".MuiToolbar-root").find("button").eq(7).click();
      //   cy.url().should("include", `/movies/nowPlaying`);
      //   cy.get("h3").contains("Now Playing Movies");
      // });
      // it("should allow navigation to the upcoming movies page from the link", () => {
      //   cy.get("header").find(".MuiToolbar-root").find("button").eq(8).click();
      //   cy.url().should("include", `/movies/upcoming`);
      //   cy.get("h3").contains("Upcoming Movies");
      // });
      // it("should allow navigation to the Playlist page from the link", () => {
      //   cy.get("header").find(".MuiToolbar-root").find("button").eq(9).click();
      //   cy.url().should("include", `/movies/playlist`);
      //   cy.get("h3").contains("Must Watch Movies");
      // });
      // it("should allow navigation to the actors page from the link", () => {
      //   cy.get("header").find(".MuiToolbar-root").find("button").eq(10).click();
      //   cy.url().should("include", `/actors`);
      //   cy.get("h3").contains("Discover Actors");
      // });
      // it("should allow navigation to the Likes page from the link", () => {
      //   cy.get("header").find(".MuiToolbar-root").find("button").eq(11).click();
      //   cy.url().should("include", `/actors/likes`);
      //   cy.get("h3").contains("Liked Actors");
      // });
    });


    describe("when the viewport is a mobile", { viewportHeight: 896, viewportWidth: 414 }, () => {
      it("should allow navigation to the home page from the dropdown menu", () => {
        cy.get("header").find("button").eq(3).click();
        cy.get("li").eq(0).click();
        cy.url().should("include", `/`);
        cy.get("h3").contains("Discover Movies");
      });
      it("should allow navigation to the Favourites page from the dropdown menu", () => {
        cy.get("header").find("button").eq(3).click();
        cy.get("li").eq(1).click();
        cy.url().should("include", `/favorites`);
        cy.get("h3").contains("Favourite Movies");
      });
      it("should allow navigation to the top rated page from the dropdown menu", () => {
        cy.get("header").find("button").eq(3).click();
        cy.get("li").eq(2).click();
        cy.url().should("include", `/topRated`);
        cy.get("h3").contains("Top Rated Movies");
      });
    });
  });

  describe("From the Favorites page", () => {
    beforeEach(() => {
      // add two movies to Favourites and visit Favourites Page
      cy.get("button[aria-label='add to favorites']").eq(0).click();
      cy.get("button[aria-label='add to favorites']").eq(1).click();
      cy.get("header").find(".MuiToolbar-root").find("button").eq(4).click();
    });
    it("should navigate to the movies detail page and change the browser URL", () => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
      cy.get("h3").contains(movies[0].title);
    });
  });

  describe("The forward/backward links", () => {
    beforeEach(() => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
    });
    it("should navigate backward and forward between the movies detail page and the Discover page.", () => {
      cy.get("button[aria-label='go back'").click();
      cy.get("h3").contains("Discover Movies");
      cy.url().should("not.include", `/movies/${movies[0].id}`);
      cy.get("button[aria-label='go forward'").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
      cy.get("h3").contains(movies[0].title);
    });
    it("should navigate backward and forward between the Favourite movies page and the movie details page", ()=>{
      //From Favourites
      cy.get("header").find(".MuiToolbar-root").find("button").eq(4).click();
      cy.get("h3").contains("Favourite Movies");
      cy.url().should("not.include", `/movies/${movies[0].id}`);

      //To movie details
      cy.get("button[aria-label='go back'").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
      cy.get("h3").contains(movies[0].title);

      //From movie details to Favourites
      cy.get("button[aria-label='go forward'").click();
      cy.get("h3").contains("Favourite Movies");
      cy.url().should("not.include", `/movies/${movies[0].id}`);
    });
  });
});