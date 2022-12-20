import fp from '../../../support/POM/e2e/forgotPasswordPage'
import login from '../../../fixtures/login.json'

describe("Testing forgotten password flow", () => {
    beforeEach(function() {
        cy.visit('/')
    })

    it('Verify registered user should be able to change the password', function() {
        fp.clickForgotPasswordBtn()
        fp.enterUserData(login.email, login.password, login.password)
        fp.clickSaveBtn()
        cy.get('.ng-trigger').then((elem) => {
            const elemText = elem.text()
            expect(elemText).to.equal(' Password Changed Successfully ')
        })
        fp.loginWithNewCredentials(login.email, login.password)
    });

    it('User should not change the password for non registered user', () => {
        fp.clickForgotPasswordBtn()
        fp.enterUserData('johnDoe3@gmail.com', '123123', '123123')
        fp.clickSaveBtn()
        cy.get('.ng-trigger').then((elem) => {
            const elemText = elem.text()
            expect(elemText).to.equal(' User Not found. ') 
        })
        cy.location('pathname').should('eq', '/client/auth/password-new')

    });

    it('Verify passwords should match each other', () => {
        fp.clickForgotPasswordBtn()
        fp.enterUserData('johnDoe3@gmail.com', '123123', '1231233')
        fp.clickSaveBtn()
        cy.get('.invalid-feedback > div').then((elem) => {
            const elemText = elem.text()
            expect(elemText).to.equal('Password and Confirm Password must match with each other.')
        })
        cy.location('pathname').should('eq', '/client/auth/password-new')
    });

    it('Verify user can not change password with incorrect email', () => {
        fp.clickForgotPasswordBtn()
        fp.enterUserData('johnDoe3gmail.com', '123123', '123123')
        fp.clickSaveBtn()
        cy.get('.invalid-feedback > div').then((elem) => {
            const elemText = elem.text()
            expect(elemText).to.equal('*Enter Valid Email')
        })
        cy.location('pathname').should('eq', '/client/auth/password-new')
    });

    it('Verify validation for required fields working as expected', () => {
        fp.clickForgotPasswordBtn()
        fp.missSomeFields(login.email)
        fp.clickSaveBtn()
        cy.get('.invalid-feedback > div').each(($el, index, list) => {
            const elemText = $el.text()
             return index === 0 ? expect(elemText).to.equal('*Password is required') : expect(elemText).to.equal('*Confirm Password is required')    
        })
        cy.location('pathname').should('eq', '/client/auth/password-new')
    });
})