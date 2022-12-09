class createUsers {
    createUser(email, password) {
          return  cy.api({
                method: 'POST',
                url:  Cypress.env('apiUrl')+'/users',
                qs: {
                    email: email,
                    password: password
                }
            }).then(response => {
                expect(response.status).to.eq(201)
                return response.body
            })
    }
}
module.exports = new createUsers()