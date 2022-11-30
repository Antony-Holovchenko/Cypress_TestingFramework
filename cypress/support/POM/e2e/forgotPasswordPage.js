class forgotPassword {

    elements = {
        forgotPasswordBtn: () => cy.get('.forgot-password-link'),
        emailField: () => cy.get('input[type="email"]'),
        passwordField: () => cy.get('#userPassword'),
        confirmPasswordField: () => cy.get('#confirmPassword'),
        saveBtn: () => cy.get('.btn-custom')
    }

    clickForgotPasswordBtn() {
        this.elements.forgotPasswordBtn().click()
    }

    enterUserData(email, password, confirmPassword) {
        this.elements.emailField().type(email)
        this.elements.passwordField().type(password)
        this.elements.confirmPasswordField().type(confirmPassword)
    }

    clickSaveBtn() {
        this.elements.saveBtn().click()
    }

    loginWithNewCredentials(email, password) {
        cy.get('#userEmail').type(email)
        cy.get('#userPassword').type(password)
        cy.get('#login').click()
        cy.location('pathname').should('eq', '/client/dashboard/dash')
    }

    missSomeFields(email) {
        this.elements.emailField().type(email)
    }
}

module.exports = new forgotPassword()