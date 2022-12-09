class getResource {
    
    
    getSingleResource(id) {
    return cy.api({
            method: 'GET',
            url: Cypress.env('apiUrl')+'/unknown/',
            qs: {
                id: id
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            return response.body.data
        })
    }

    getListOfResources(page) {
        return cy.api({
                method: 'GET',
                url: Cypress.env('apiUrl')+'/unknown/',
                qs: {
                    page: page
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                return response.body.data
            })
        }
}
module.exports = new getResource()