let movies;    // List of movies from TMDB
let favorites;
// Utility functions
const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));

describe("Favourites Page ", () => {
  before(() => {
    // Get movies from TMDB and store in movies variable.
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")    // Take the body of HTTP response from TMDB
      .then((response) => {
        movies = response.results
      })
  })
  beforeEach(() => {
    cy.visit("/");
    cy.get("button[aria-label='add to favorites']").eq(0).click();
    cy.get("button[aria-label='add to favorites']").eq(1).click();
    favorites=[movies[0],movies[1]];
    cy.get(".MuiCardHeader-avatar").should("have.length",favorites.length);

    cy.get("header").find(".MuiToolbar-root").find("button").eq(4).click();
    cy.get(".MuiCardHeader-content").should("have.length",favorites.length);
    cy.get(".MuiCardHeader-content").each(($card, index) => {
      cy.wrap($card).find("p").contains(favorites[index].title);
    });
  });

  describe("Base tests", () => {
    it("displays page header", () => {
      cy.get("h3").contains("Favourite Movies");
      cy.get("h1").contains("Filter the movies");
    });
  });

  describe("Filtering", () => {
    describe("By movie title", () => {
     it("should only display movies with m in the title", () => {
       let searchString = "m";
       let matchingMovies = filterByTitle(favorites, searchString);
       cy.get("#filled-search").clear().type(searchString); // Enter m in text box
       cy.get(".MuiCardHeader-content").should(
         "have.length",
         matchingMovies.length
       );
       cy.get(".MuiCardHeader-content").each(($card, index) => {
         cy.wrap($card).find("p").contains(matchingMovies[index].title);
       });
     })
     it("should only display movies with o in the title", () => {
       let searchString = "o";
       let matchingMovies = filterByTitle(favorites, searchString);
       cy.get("#filled-search").clear().type(searchString); // Enter m in text box
       cy.get(".MuiCardHeader-content").should(
         "have.length",
         matchingMovies.length
       );
       cy.get(".MuiCardHeader-content").each(($card, index) => {
         cy.wrap($card).find("p").contains(matchingMovies[index].title);
       });
     });
     it("should only display movies with xyz in the title", ()=>{
         let searchString="xyz";
         let matchingMovies = filterByTitle(favorites, searchString);
         cy.get("#filled-search").clear().type(searchString); // Enter xyz in text box
         cy.get(".MuiCardHeader-content").should(
          "have.length",
          matchingMovies.length
        );
     });
   });
   
   describe("By movie genre" ,() => {
    it("should display movies with the specified genre only", () => {
        const selectedGenreId = 35;
        const selectedGenreText = "Comedy";
        const matchingMovies = filterByGenre(favorites, selectedGenreId);
        cy.get("#genre-select").click();
        cy.get("li").contains(selectedGenreText).click();
        cy.get(".MuiCardHeader-content").should(
          "have.length",
          matchingMovies.length
        );
        cy.get(".MuiCardHeader-content").each(($card, index) => {
          cy.wrap($card).find("p").contains(matchingMovies[index].title);
        });
      });
    });

    describe("By movie title and genre", ()=>{
      it("should only display movies with m in the title and the specified genre", ()=>{
          let searchString="m";
          let matchingMovies=filterByTitle(favorites,searchString);
  
          const selectedGenreId=12;
          const selectedGenreText="Adventure";
          matchingMovies=filterByGenre(matchingMovies,selectedGenreId);
  
          cy.get("#filled-search").clear().type(searchString); // Enter m in text box
          cy.get("#genre-select").click();
          cy.get("li").contains(selectedGenreText).click(); //Choose comedy genre
          cy.get(".MuiCardHeader-content").should(
            "have.length",
            matchingMovies.length
          );
          cy.get(".MuiCardHeader-content").each(($card, index) => {
            cy.wrap($card).find("p").contains(matchingMovies[index].title);
          });
      });
     });
  });



  describe("Deleting favorite movies", ()=>{
    it("should delete movie from favourites",()=>{
      cy.get("button[aria-label='remove from favorites']").eq(0).click();
      favorites=[favorites[1]];
      cy.get(".MuiCardHeader-avatar").should("have.length",favorites.length);
      cy.get(".MuiCardHeader-content").should("have.length",favorites.length);
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(favorites[index].title);
      });
    });
  });

  describe("Add review to a movie", ()=>{
    it("should display the add review page of this movie",()=>{
      cy.get("button[aria-label='remove from favorites']").eq(0).next().click();
      const movie = favorites[0];
      cy.get("h3").contains(movie.title);
      cy.get("h2").contains("Write a review");
    });
  });
});