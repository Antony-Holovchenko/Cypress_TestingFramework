import update from '../../../support/POM/API/updateUsersPage'
import userId from '../../../fixtures/API/userId.json'
import data from '../../../fixtures/API/updateUserInfo.json'

describe('Update user information', () => {

    it('Update users information', () => {
        update.updateUsers(userId[1], data.name, data.job).then((updatedUser) => {
           cy.getCurrentDate().then((date) => {
                expect(updatedUser.updatedAt).to.include(date)
           }) 
        })
    })
})