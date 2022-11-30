class registration {

    elements = {
        firstName: () => cy.get('#firstName'),
        lastName: () => cy.get('#lastName'),
        email: () => cy.get('#userEmail'),
        phone: () => cy.get('#userMobile'),
        occupation: () => cy.get('.custom-select'),
        gender: () => cy.get('input[type="radio"]'),
        password: () => cy.get('#userPassword'),
        confirmPassword: () => cy.get('#confirmPassword'),
        checkbox: () => cy.get('input[type="checkbox"]'),
        registerBtn: () => cy.get('#login')
    }

    enterNameSurname(name, surname) {
        cy.contains("Don't have an account?").click()
        this.elements.firstName().type(name)
        this.elements.lastName().type(surname)
    }

    enterEmailPhone(email, phone) {
        this.elements.email().type(email)
        this.elements.phone().type(phone)
    }
    
    chooseOccupationGender(occupation, gender) {
        this.elements.occupation().select(occupation)
        this.elements.gender().each(($el, index, $list) => {
            if($el.prop('value') === gender) {
                $el.click()
            }
        })
    }

    enterPasswords(password, confirmPassword) {
        this.elements.password().type(password)
        this.elements.confirmPassword().type(confirmPassword)        }
    
    finishRegistration() {
        this.elements.checkbox().check()
        this.elements.registerBtn().click()
        cy.wait(1000)
    }

}

module.exports = new registration()