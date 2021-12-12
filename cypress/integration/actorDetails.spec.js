let actorId = 1230687; // The actor id of Piper Perabo
let actor;
let images;
let reviews;

describe("Actor Details Page", () => {
  before(() => {
      //get details of this actor
    cy.request(
        `https://api.themoviedb.org/3/person/${actorId}?api_key=${Cypress.env("TMDB_KEY")}&language=en-US`
    )
      .its("body")
      .then((actorDetails) => {
        actor = actorDetails;
        return actorDetails.id;
      });
    //get images of this actor
      cy.request(
        `https://api.themoviedb.org/3/person/${actorId}/images?api_key=${Cypress.env("TMDB_KEY")}`
      ) 
      .its("body")
      .then((actorImages) => {
        images = actorImages;
        return actorImages.id;
      });
  });
  beforeEach(() => {
    cy.visit(`/actors/${actor.id}`);
  });
  describe("Base tests", () => {
    it("should display actor name and birthday in the page header", () => {
      cy.get("h3").contains(actor.name);
      cy.get("h3").contains(actor.birthday);
    });

    it("should display the actor's details", () => {
        cy.get("h4[aria-label='introduction']").contains("Introduction");
        cy.get("p[aria-label='hometown']").contains(actor.place_of_birth);
        cy.get("p[aria-label='biography']").contains(actor.biography);
    });

    it("should display the actor's posters on the left-hand side", ()=>{
        const posterLinks = images.profiles.map((i) => i.file_path);
        console.log(posterLinks);
        cy.get("img").should("have.length", posterLinks.length);
        cy.get("img").each(($img, index)=> {
            cy.wrap($img).should('have.attr','src','https://image.tmdb.org/t/p/w500/'+posterLinks[index]);
        });
    });
  });
});