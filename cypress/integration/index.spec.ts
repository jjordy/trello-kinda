
describe("Nextjs Boilerplate - Todo List", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should have a header for the page.", () => {
    cy.get("h1").contains("Todo List").should("exist");
    cy.dataCy("no-todo-items-title").should("have.class", "opacity-1");
  });

  it("Should have an input to add a new todo", () => {
    cy.dataCy("add-todo-input").should("exist");
  });

  it("Should have an add button", () => {
    cy.dataCy("add-button").should("exist");
  });

  it("Should type in the add input and submit the todo", () => {
    cy.dataCy("add-todo-input").type("This is a test todo")
    cy.dataCy("add-button").click()
    cy.dataCy("todo-item-name-input-0").should("exist");
  });

  it("Should allow you to edit the todo item name", () => {
    cy.dataCy("todo-item-name-input-0").clear().type("A New Name");
    cy.dataCy("todo-item-name-input-0").should("have.value", "A New Name")
  });

  it("Should allow you to toggle the todo completed.", () => {
    cy.dataCy("todo-item-isComplete-input-0").click();
    cy.dataCy("todo-item-save-btn-0").click();
  });

  it("Should strike through the text when completed", () => {
    cy.dataCy("todo-item-name-input-0").should("have.class", "line-through");
    console.log(localStorage.getItem("todo_list"))
  });

  // it("Should persist todo state between refreshes with localStorage", () => {
  //   Cypress.log({ message: localStorage.getItem("todo_list") });
  //   expect(localStorage.getItem("todo_list")).to.exist;
  //   // cy.dataCy("todo-item-name-input-0").should("exist");
  // });

  // it("Should delete a todo", () => {
  //   cy.dataCy("todo-item-del-btn-0").click();
  //   cy.dataCy("no-todo-items-title").should("have.class", "opacity-1")
  // });

});

export {};
