describe("Appointments", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
    //cy.wait(2000);
  }); 
  
  it("should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();
    cy.wait(500); // Add a small wait to ensure the input is visible and ready for interaction
    cy.get("[data-testid=form-student-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });
    cy.wait(500); // Add a small wait to ensure the input is visible and ready for interaction
    cy.get("[data-testid=form-student-input]").clear().type("Fredrick Burns");
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Fredrick Burns");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]").first().click({ force: true });
    cy.contains("Confirm").click();
    cy.contains("Deleting").should("exist", { retry: 500 }); // Retry the assertion for up to 5000ms
    cy.contains("Deleting").should("not.exist", { timeout: 10000 }); // Wait for "Deleting" text to disappear
  });

})