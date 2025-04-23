
describe('account creation', () => {
    before(() => {
    })

    beforeEach(() => {
        cy.visit('http://localhost:3000/signup')
    })

    it('has the correct form components', () => {
        cy.get(`[id=name]`)
        cy.get(`[id=email]`)
        cy.get(`[id=password]`)
    })

    it("does not allow short passwords", () => {
        cy.get(`[id=name]`).type("test testerson")
        cy.get(`[id=email]`).type("test.test@testmail.com")
        cy.get(`[id=password]`).type("Abc123")

        cy.contains("Sign up").click()


    })

    it('allows you to enter your details', () => {
        cy.get(`[id=name]`).type("test testerson")
        cy.get(`[id=email]`).type("test.test@testmail.com")
        cy.get(`[id=password]`).type("Password123")
    })
})

//describe('login', () => {
//    before(() => {
//    })
//
//    beforeEach(() => {
//        cy.visit('http://localhost:3000')
//    })
//
//    it(() => {
//
//    })
//})
