describe('Dependent tests bad practice', () => {
  beforeEach(() => {
    cy.visit('http://notes-serverless-app.com/login')
    
    cy.get('#email').type(Cypress.env('user_email'))
    cy.get('#password').type(Cypress.env('user_password'), { log: false })
    cy.get('button[type="submit"]').click()
    
    cy.contains('h1', 'Your Notes', { timeout: 10000 }).should('be.visible')
  })

  it('CRUDs a note', () => {
    //create a note
    cy.contains('Create a new note').click()

    cy.get('#content').type('My note')
    cy.contains('Create').click()

    //Assert the note was created
    cy.get('.list-group').should('contain', 'My note')

    //Updates the note
    cy.get('#content').type(' updated')
    cy.contains('Save').click()

    //Asserts the note update
    cy.get('.list-group').should('contain', 'My note updated')
    cy.get('.list-group:contains(My note updated)').should('be.visible')

    //Deletes the note
    cy.get('.list-group').contains('My note update').click()
    cy.contains('Delete').click()

    //Asserts the note was deleted
    cy.get('.list-group:contains(My note updated)').should('not.exist')
  }) 
})
