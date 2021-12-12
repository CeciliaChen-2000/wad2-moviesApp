let actors;    // List of actors from TMDB
let mId = 580489;
// Utility functions
const filterByName = (actorList, string) =>
  actorList.filter((m) => m.name.toLowerCase().search(string) !== -1);

const sortByPopularity = (actorList, isSwitchOn) => {
    let sorted = isSwitchOn ?
    actorList.filter((m) => m.name.toLowerCase().search('') !== -1) :
    actorList
      .filter((a) => {
        return a.name.toLowerCase().search('') !== -1;
      }).sort((a, b) => { return a.popularity - b.popularity })
    return sorted;
};

describe("Credits Page ", () => {
  before(() => {
    // Get actors from TMDB and store in actors variable.
    cy.request(
      `https://api.themoviedb.org/3/movie/${mId}/credits?api_key=${Cypress.env("TMDB_KEY")}&language=en-US`
    )
      .its("body")    // Take the body of HTTP response from TMDB
      .then((response) => {
        actors = response.cast
      })
  })
  beforeEach(() => {
    cy.visit(`/movies/${mId}/credits`)
  });

  describe("Base tests", () => {
    it("displays page header", () => {
      cy.get("h3").contains("Related Credits");
      cy.get("h6").contains("Search an actor or sort them according to popularity!");
    });
  });

  describe("Filtering", () => {
    describe("By credit name", () => {
     it("should only display credits with m in the name", () => {
       let searchString = "m";
       let matchingActors = filterByName(actors, searchString);
       cy.get("#filled-search").clear().type(searchString); // Enter m in text box
       cy.get(".MuiCardHeader-content").should(
         "have.length",
         matchingActors.length
       );
       cy.get(".MuiCardHeader-content").each(($card, index) => {
         cy.wrap($card).find("p").contains(matchingActors[index].name);
       });
     })
     it("should only display credits with o in the name", () => {
       let searchString = "o";
       let matchingActors = filterByName(actors, searchString);
       cy.get("#filled-search").clear().type(searchString); // Enter m in text box
       cy.get(".MuiCardHeader-content").should(
         "have.length",
         matchingActors.length
       );
       cy.get(".MuiCardHeader-content").each(($card, index) => {
         cy.wrap($card).find("p").contains(matchingActors[index].name);
       });
     });
     it("should only display credits with xyz in the name", ()=>{
         let searchString="xyz";
         let matchingActors = filterByName(actors, searchString);
         cy.get("#filled-search").clear().type(searchString); // Enter xyz in text box
         cy.get(".MuiCardHeader-content").should(
          "have.length",
          matchingActors.length
        );
     });
   });
   
      describe("Sort credit by popularity", () => {
          it("should display actors with the popularity from low to high", () => {
              cy.get(".MuiSwitch-root").click();
              let isSwitchOn = false; //popularity from low to high
              let matchingActors = sortByPopularity(actors,isSwitchOn);
              cy.get(".MuiCardHeader-content").should("have.length",matchingActors.length);
              cy.get(".MuiCardHeader-content").each(($card, index) => {
                cy.wrap($card).find("p").contains(matchingActors[index].name);
              });
          });
      });

    describe("Filter and sort by credit name and popularity", ()=>{
      it("should only display actors with m in the name with the popularity from low to high", ()=>{
          let searchString="m";
          let matchingActors=filterByName(actors,searchString);
  
          let isSwitchOn = false;
          matchingActors = sortByPopularity(matchingActors,isSwitchOn);
  
          cy.get("#filled-search").clear().type(searchString); // Enter m in text box
          cy.get(".MuiSwitch-root").click(); //Click switch
          cy.get(".MuiCardHeader-content").should("have.length", matchingActors.length);
          cy.get(".MuiCardHeader-content").each(($card, index) => {
              cy.wrap($card).find("p").contains(matchingActors[index].name);
          });
      });
     });
  });



  describe("Selecting like credits", ()=>{
    it("should display an avatar at the top of the credit card and be added to the like credits page",()=>{
      cy.get("button[aria-label='add to likes']").eq(0).click();
      cy.get("button[aria-label='add to likes']").eq(1).click();
      const likes=[actors[0],actors[1]];
      cy.get(".MuiCardHeader-avatar").should("have.length",likes.length);

      cy.get("header").find(".MuiToolbar-root").find("button").eq(11).click();
      cy.get(".MuiCardHeader-content").should("have.length",likes.length);
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(likes[index].name);
      });
    });
  });

  describe("Learn more about credit", ()=>{
    it("should display the credit details page",()=>{
      cy.get("Button[aria-label='LearnMore']").eq(0).click();
      cy.url().should("include", `/actors/${actors[0].id}`);
      cy.get("h3").contains(actors[0].name);
    });
  });
});