import data from '../../../fixtures/API/getUsers.json'
import getUser from '../../../support/POM/API/getUsersPage'
describe('User creation', () => {
    
    it('Get single user and check his/her information', function() {
        getUser.getSingleUser(2).then((user) => {
            expect(user).to.have.property('first_name', data.firstName)
            expect(user).to.have.property('last_name', data.lastName)
        })
    })
    

    it('Verify 404 status code when user is not found', function() {
        getUser.getSingleUser(222).then((user) => {
            expect(user).not.to.have.property('first_name')
            expect(user).not.to.have.property('last_name')
            expect(user.body).to.be.empty;
        })
                    
        
    })

    it('Get list of users and verify the legth should be 6', function() {        
        getUser.getListOfUsers(1).then((users) => {
            expect(users).to.have.lengthOf(6)
        })
    })
    
})