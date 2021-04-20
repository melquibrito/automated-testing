context('Log in', () => {
    beforeEach(() => {
      cy.visit('https://demo.applitools.com/index.html')
    })

    it('loging in...', ()=>{
        cy.get("#username")
          .type("melquibrito07@gmail.com", {delay: 80})
          .invoke("val")
          .should("match", /^\w+@\w+\..+$/);
        cy.wait(200);

        cy.get("#password")
          .type("80013672@Testing", {delay: 100})
          .invoke("val")
          .should("match", /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
        cy.wait(200);

        cy.get("body > div.all-wrapper.menu-side.with-pattern > div > form > div.buttons-w > div.form-check-inline > label > input").check();
        cy.wait(200);

        cy.intercept("/app.html").as("landingPage");
        cy.get("#log-in").click();
        cy.wait("@landingPage").its("response.statusCode").should("eq", 200);
    })
})
  