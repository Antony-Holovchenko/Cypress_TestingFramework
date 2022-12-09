import newUser from '../../../support/POM/API/createUsersPage'
import data from '../../../fixtures/API/createUser.json'

describe('Create different users', () => {
    
    it('Create several different users', function() {
        let idArray = []
        data.users.forEach((user) => {
            newUser.createUser(user.email, user.password).then((response) => { 
                idArray.push(response.id)
                expect(response.id).to.exist
            })
        })
        cy.writeFile('cypress/fixtures/API/updateUser.json', idArray)
    })
   
})