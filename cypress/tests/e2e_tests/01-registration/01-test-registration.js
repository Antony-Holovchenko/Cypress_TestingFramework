import registr from '../../../support/POM/e2e/registrationPage'
import registrationData from '../../../fixtures/registration.json'
// !!! First change the "email" in registration.json file -> then all tests will be passed

describe('Registration', () => {
    beforeEach(function () {
        cy.visit('/')
    })
    
    it("Registration of a new user in the system", function () {
        registr.enterNameSurname(registrationData.firstName, registrationData.lastName)
        registr.enterEmailPhone(registrationData.email, registrationData.phone)
        registr.chooseOccupationGender(registrationData.occupation, registrationData.gender)
        registr.enterPasswords(registrationData.password, registrationData.confirmPassword)
        registr.finishRegistration()
        cy.get('h1.headcolor').then((elem) => {
            const elemText = elem.text()
            expect(elemText).to.equal('Account Created Successfully')
        })
    })

    it("Verify validation for existing users", function () {
        registr.enterNameSurname(registrationData.firstName, registrationData.lastName)
        registr.enterEmailPhone(registrationData.email, registrationData.phone)
        registr.chooseOccupationGender(registrationData.occupation, registrationData.gender)
        registr.enterPasswords(registrationData.password, registrationData.confirmPassword)
        registr.finishRegistration()
        cy.get('#toast-container').then((elem) => {
            const elemText = elem.text()
            expect(elemText).to.equal(' User already exisits with this Email Id! ')
        })

    })

    it("Verify validation during registration process", function() {
        registr.enterNameSurname(registrationData.firstName, registrationData.lastName)
        registr.enterEmailPhone(registrationData.email, '+' + registrationData.phone)
        registr.chooseOccupationGender(registrationData.occupation, registrationData.gender)
        registr.enterPasswords(registrationData.password, registrationData.confirmPassword + '$')
        registr.finishRegistration()
        cy.get('div.invalid-feedback').should('be.visible')
        cy.get('h1.headcolor').should('not.exist')
    })
})