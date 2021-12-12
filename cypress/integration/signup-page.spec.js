describe("Sign up page",()=>{
    beforeEach(() => {
        cy.visit(`/signup`);
    });

    describe("Base tests",()=>{
        it("should display the header of sign up page",()=>{
            cy.get("h3").contains("Sign up");
        })
    })

    describe("Sign up verification",()=>{
        it("should reset the content in the input by clicking 'Reset'",()=>{
            cy.get('[placeholder="Nickname"]').type('Cecilia').should('have.value','Cecilia');
            cy.get('[placeholder="Email"]').type('20095989@mail.wit.ie').should('have.value','20095989@mail.wit.ie');
            cy.get('[placeholder="Password"]').type('123456').should('have.value','123456');
            cy.get('button[type="reset"]').click();

            cy.get('[placeholder="Nickname"]').should('have.value','');
            cy.get('[placeholder="Email"]').should('have.value','');
            cy.get('[placeholder="Password"]').should('have.value','');
        });

        // describe("When email address is correct and password has at least 6 characters",()=>{
        //     it("should display message of successfully sign up",()=>{
        //         cy.get('[placeholder="Nickname"]').type('Liangyu Chen').should('have.value', 'Liangyu Chen');
        //         cy.get('[placeholder="Email"]').type('cecilia_nuist_0014@163.com').should('have.value', 'cecilia_nuist_0014@163.com');
        //         cy.get('[placeholder="Password"]').type('123456').should('have.value', '123456');
        //         cy.get('button[type="submit"]').click();
        //         cy.get('p').contains("Success!");
        //     })
        // })
        describe("When email address is not correct",()=>{
            it("should display message of bad format email with imvalid email address", () => {
                cy.get('[placeholder="Nickname"]').type('Cecilia').should('have.value', 'Cecilia');
                cy.get('[placeholder="Email"]').type('xxxxx').should('have.value', 'xxxxx');
                cy.get('[placeholder="Password"]').type('123456').should('have.value', '123456');
                cy.get('button[type="submit"]').click();
                cy.get('p').contains("The email address is badly formatted.");
            })
            it("should display message of already signed up user with existed address",()=>{
                cy.get('[placeholder="Nickname"]').type('Cecilia').should('have.value', 'Cecilia');
                cy.get('[placeholder="Email"]').type('20095989@mail.wit.ie').should('have.value', '20095989@mail.wit.ie');
                cy.get('[placeholder="Password"]').type('123456').should('have.value', '123456');
                cy.get('button[type="submit"]').click();
                cy.get('p').contains("The email address is already in use by another account.");
            })
        })

        describe("When the password is invalid",()=>{
            it("should display message of too short password", () => {
                cy.get('[placeholder="Nickname"]').type('Liangyu Chen').should('have.value', 'Liangyu Chen');
                cy.get('[placeholder="Email"]').type('cecilia_nuist_0014@163.com').should('have.value', 'cecilia_nuist_0014@163.com');
                cy.get('[placeholder="Password"]').type('1234').should('have.value', '1234');
                cy.get('button[type="submit"]').click();
                cy.get('p').contains("Password should be at least 6 characters");
            })
        })
    });
});