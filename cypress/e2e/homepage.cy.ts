describe('home page', () => {
    it('is online', () => {
        cy.visit('/')
    })
  
    it('reaches login through start-now url', () => {
        cy.visit('/start-now')

        cy.url().should('contain', 'login')

    })
  
    it('finds login through start now button', () => {
        cy.visit('/')
        cy.contains('Start Now').click()

        cy.url().should('contain', 'login')

    })
  
    it('finds login through login button', () => {
        cy.visit('/')
        cy.contains('Login').click()

        cy.url().should('contain', 'login')

    })
  
    it('finds sign up through sign up', () => {
        cy.visit('/')
        cy.contains('Sign Up').click()

        cy.url().should('contain', 'signup')

    })
  
    it('finds the correct info pages', () => {
        cy.visit('/')
        cy.contains('Kontakt').click()
        cy.url().should('contain', 'info#kontakt')

        cy.visit('/')
        cy.contains('FAQ').click()
        cy.url().should('contain', 'info#faq')

        cy.visit('/')
        cy.contains('Om oss').click()
        cy.url().should('contain', 'info#om-oss')
    })
})
