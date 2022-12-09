class getUser {
    getSingleUser(id) {
        return cy.api({
            method: 'GET',
            url: Cypress.env('apiUrl')+'/users',
            qs: {
                id: id
            },
            failOnStatusCode: false
            }).then(response => {
                return response.status==200 ? response.body.data : expect(response.status).to.eq(404) && response.body.data
                 
            })
    }

    getListOfUsers(page) {
        return cy.api({ 
                method: 'GET',
                url: Cypress.env('apiUrl')+'/users',
                qs: {
                page: page
                }
                }).then(response => {
                    expect(response.status).to.eq(200)
                    return response.body.data 
                })
    }
}
module.exports = new getUser()