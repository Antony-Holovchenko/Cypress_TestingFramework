class updateUsers {
    
    updateUsers(id, name, job) {
    return cy.api({
            method: 'PUT',
            url:  Cypress.env('apiUrl')+'/users/'+id,
            qs: {
                name: name,
                job: job
            }
        }).then(response => {
            expect(response.status).to.eq(200)
            return response.body
        })
    }
}
exports.default = new updateUsers()