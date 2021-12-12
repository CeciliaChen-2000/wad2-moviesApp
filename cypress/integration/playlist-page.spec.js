let movies;    // List of movies from TMDB
let playlist;
// Utility functions
const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));

describe("Playlist Page ", () => {
  before(() => {
    // Get upcoming movies from TMDB and store in movies variable.
    cy.request(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`
    )
      .its("body")    // Take the body of HTTP response from TMDB
      .then((response) => {
        movies = response.results
      })
  })
  beforeEach(() => {
    cy.visit("/movies/upcoming");
    cy.get("button[aria-label='add to playlist']").eq(0).click();
    cy.get("button[aria-label='add to playlist']").eq(1).click();
    playlist=[movies[0],movies[1]];
    cy.get("p[aria-label='message']").contains("Successfully added in playlist!");

    cy.get("header").find(".MuiToolbar-root").find("button").eq(9).click();
    cy.get(".MuiCardHeader-content").should("have.length",playlist.length);
    cy.get(".MuiCardHeader-content").each(($card, index) => {
      cy.wrap($card).find("p").contains(playlist[index].title);
    });
  });

  describe("Base tests", () => {
    it("displays page header", () => {
      cy.get("h3").contains("Must Watch Movies");
      cy.get("h1").contains("Filter the movies");
    });
  });

  describe("Filtering", () => {
    describe("By movie title", () => {
     it("should only display movies with m in the title", () => {
       let searchString = "a";
       let matchingMovies = filterByTitle(playlist, searchString);
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
       let matchingMovies = filterByTitle(playlist, searchString);
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
         let matchingMovies = filterByTitle(playlist, searchString);
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
        const matchingMovies = filterByGenre(playlist, selectedGenreId);
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
          let searchString="a";
          let matchingMovies=filterByTitle(playlist,searchString);
  
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



  describe("Deleting playlist movies", ()=>{
    it("should delete movie from playlist",()=>{
      cy.get("button[aria-label='remove from playlist']").eq(0).click();
      playlist=[playlist[1]];
      cy.get(".MuiCardHeader-content").should("have.length",playlist.length);
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(playlist[index].title);
      });
    });
  });
});