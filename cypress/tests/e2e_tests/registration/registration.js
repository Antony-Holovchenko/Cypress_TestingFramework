import registr from '../../../support/POM/e2e/registrationPage'
// !!! First change the "email" in registration.json file -> then all tests will be passed

describe('Registration', () => {
    beforeEach(function () {
        cy.visit('/')
        cy.fixture('registration').then((data) => {
            this.data = data  
        })
    })
    
    it("Registration of a new user in the system", function () {
        registr.enterNameSurname(this.data.firstName, this.data.lastName)
        registr.enterEmailPhone(this.data.email, this.data.phone)
        registr.chooseOccupationGender(this.data.occupation, this.data.gender)
        registr.enterPasswords(this.data.password, this.data.confirmPassword)
        registr.finishRegistration()
        cy.get('h1.headcolor').then((elem) => {
            const elemText = elem.text()
            expect(elemText).to.equal('Account Created Successfully')
        })
    })

    it("Verify validation for existing users", function () {
        registr.enterNameSurname(this.data.firstName, this.data.lastName)
        registr.enterEmailPhone(this.data.email, this.data.phone)
        registr.chooseOccupationGender(this.data.occupation, this.data.gender)
        registr.enterPasswords(this.data.password, this.data.confirmPassword)
        registr.finishRegistration()
        cy.get('#toast-container').then((elem) => {
            const elemText = elem.text()
            expect(elemText).to.equal(' User already exisits with this Email Id! ')
        })

    })

    it("Verify validation during registration process", function() {
        registr.enterNameSurname(this.data.firstName, this.data.lastName)
        registr.enterEmailPhone(this.data.email, '+' + this.data.phone)
        registr.chooseOccupationGender(this.data.occupation, this.data.gender)
        registr.enterPasswords(this.data.password, this.data.confirmPassword + '$')
        registr.finishRegistration()
        cy.get('div.invalid-feedback').should('be.visible')
        cy.get('h1.headcolor').should('not.exist')
    })
})