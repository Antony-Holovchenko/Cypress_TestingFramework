import registrationData from '../fixtures/registration.json'

//Custom commands
Cypress.Commands.add('login', (email, password) => {
    cy.session([email, password], () => {
        cy.visit('/')
        cy.get('#userEmail').type(email)
        cy.get('#userPassword').type(password)
        cy.get('#login').click()
        cy.location('pathname').should('eq', '/client/dashboard/dash')
    },
    {
        cacheAcrossSpecs: true
    })
})

 Cypress.Commands.add('selectProduct', (product) => {
    cy.get('h5').each(($el, index, $list) => {
        if($el.text().includes(product)) {
            cy.get('button[class="btn w-10 rounded"]').eq(index).click()
        }
    })
 })

 Cypress.Commands.add('getCurrentDate', () => {
    return new Date().toISOString().slice(0, 10)
})
