
describe('account creation', () => {
    before(() => {
        const testUser = {
            email: "test.user.runberg@gmail.com",
            password: "Password123",
            fullName: "test user"
        }

        const sameEmailUser = {
            email: "testuser.runberg@gmail.com",
            password: "Password1234",
            fullName: "test user"
        }

        const shortPassUser = {
            email: "testuser.runbergtwo@gmail.com",
            password: "Pas3",
            fullName: "test user"
        }

        const badNameUser = {
            email: "testuser.runbergthree@gmail.com",
            password: "Password123",
            fullName: "testuser"
        }

        const badEmailUser = {
            email: "test.test@test.test",
            password: "Password123",
            fullName: "test user"
        }
    })

    beforeEach(() => {
        cy.visit('http://localhost:3000/signup')
    })

    // it('should not find weird iten', () => {
    //     cy.getByData('hello-there').should("exist")
    // })

    it("does not allow short passwords", () => {
        cy.get(`[id=name]`).type("test testerson")
        cy.get(`[id=name]`).type("test testerson")
        cy.get(`[id=email]`).type("test.test@testmail.com")
        cy.get(`[id=password]`).type("Abc123")
        cy.get(`[id=terms]`).click()

        cy.contains("Sign up").click()
        cy.url().should('equal', "http://localhost:3000/signup")


    })

    it('allows you to enter your details', () => {
        cy.get(`[id=name]`).type("test testerson")
        cy.get(`[id=email]`).type("testnew.runberg@gmail.com")
        cy.get(`[id=password]`).type("Password123")
        cy.get(`[id=terms]`).click()
        cy.contains("Sign up").click()
        cy.url().should('equal', "http://localhost:3000/")
    })

    it('should not allow duplicate users', () => {
        cy.get(`[id=name]`).type("test testersdotter")
        cy.get(`[id=email]`).type("testersdottir.runberg@gmail.com")
        cy.get(`[id=password]`).type("Password321")
        cy.get(`[id=terms]`).click()
        cy.contains("Sign up").click()

        cy.visit("http://localhost:3000/signup")
        cy.get(`[id=name]`).type("test testersdotter")
        cy.get(`[id=email]`).type("testersdottir.runberg@gmail.com")
        cy.get(`[id=password]`).type("Password321")
        cy.get(`[id=terms]`).click()
        cy.contains("Sign up").click()

        cy.url().should('equal', "http://localhost:3000/signup/error")

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
