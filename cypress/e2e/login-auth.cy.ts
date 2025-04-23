
describe('account creation', () => {
    before(() => {
        const testUser = {
            email: "test.user.runberg@gmail.com",
            password: "Password123",
            fullName: "test user"
        }

        const sameEmailUser = {
            email: "test.user.runberg@gmail.com",
            password: "Password1234",
            fullName: "test user"
        }

        const shortPassUser = {
            email: "test.user.runberg.two@gmail.com",
            password: "Pas3",
            fullName: "test user"
        }

        const noNameUser = {
            email: "test.user.runberg.three@gmail.com",
            password: "Password123",
            fullName: "testuser"
        }

        const noEmailUser = {
            email: "test@test.test",
            password: "Password123",
            fullName: "testuser"
        }
    })

    beforeEach(() => {
        cy.visit('http://localhost:3000/signup')
    })

    // it('should not find weird iten', () => {
    //     cy.getByData('hello-there').should("exist")
    // })

    it('has the correct form components', () => {
        cy.get(`[id=name]`)
        cy.get(`[id=email]`)
        cy.get(`[id=password]`)
        cy.get(`[id=terms]`)
    })

    it("does not allow short passwords", () => {
        cy.get(`[id=name]`).type("test testerson")
        cy.get(`[id=email]`).type("test.test@testmail.com")
        cy.get(`[id=password]`).type("Abc123")
        cy.get(`[id=terms]`).click()

        cy.contains("Sign up").click()
        cy.url().should('equal', "http://localhost:3000/signup")


    })

    it('allows you to enter your details', () => {
        cy.get(`[id=name]`).type("test testerson")
        cy.get(`[id=email]`).type("test.test.runberg@gmail.com")
        cy.get(`[id=password]`).type("Password123")
        cy.get(`[id=terms]`).click()
        cy.contains("Sign up").click()
        cy.url().should('equal', "http://localhost:3000")
    })

    it('should not allow duplicate users', () => {
        cy.get(`[id=name]`).type("test testersdotter")
        cy.get(`[id=email]`).type("test.test.runberg@gmail.com")
        cy.get(`[id=password]`).type("Password321")
        cy.get(`[id=terms]`).click()
        await cy.contains("Sign up").click()
        cy.url().should('equal', "http://localhost:3000/error")

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
