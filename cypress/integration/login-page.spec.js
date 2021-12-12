describe("Log in page",()=>{
    beforeEach(() => {
        cy.visit(`/login`);
    });

    describe("Base tests",()=>{
        it("should display the header of login page",()=>{
            cy.get("h3").contains("Log in");
        })
    })

    describe("Log in verification",()=>{
        it("should reset the content in the input by clicking 'Reset'",()=>{
            cy.get('[placeholder="Email"]').type('20095989@mail.wit.ie').should('have.value','20095989@mail.wit.ie');
            cy.get('[placeholder="Password"]').type('123456').should('have.value','123456');
            cy.get('button[type="reset"]').click();
            cy.get('[placeholder="Email"]').should('have.value','');
            cy.get('[placeholder="Password"]').should('have.value','');
        });

        describe("When the email address is valid and existed", () => {
            it("should display message of success for valid email and password", () => {
                const email = "20095989@mail.wit.ie";
                const password = "123456";
                cy.login(email , password);
                cy.get('p').contains("Success!");
            });

            it("should display message of failed for valid email but incorrect password", () => {
                const email = "20095989@mail.wit.ie";
                const password = "1234";
                cy.login(email , password);
                cy.get('p').contains("The password is invalid or the user does not have a password.");
            });
        });

        describe("When the email address is invalid",()=>{
            it("should display message of bad format email address",()=>{
                const email = "xxxxx";
                const password = "123456";
                cy.login(email , password);
                cy.get('p').contains("The email address is badly formatted.");
            });
        });
        describe("When the email address is valid but not existed",()=>{
            it("should display message of not existing email address",()=>{
                const email = "cecilia_nuist_0014@163.com";
                const password = "123456";
                cy.login(email , password);
                cy.get('p').contains("There is no user record corresponding to this identifier. The user may have been deleted.");
            });
        });
    });
});