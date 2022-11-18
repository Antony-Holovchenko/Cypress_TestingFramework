
Cypress.Commands.add('login', (email, password) => {
    cy.get('#userEmail').type(email)
    cy.get('#userPassword').type(password)
    cy.get('#login').click()
 })

 Cypress.Commands.add('selectProduct', (product) => {
    cy.get('h5').each(($el, index, $list) => {
        if($el.text().includes(product)) {
            cy.get('button[class="btn w-10 rounded"]').eq(index).click()
        }
    })
 })