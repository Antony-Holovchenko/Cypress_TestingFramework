import getResource from '../../../support/POM/API/getResoursePage'
describe('Get sengle resource', () => {
    it('Get single resource', () => {
        getResource.getSingleResource(1).then((resource) => {
            expect(resource).to.deep.eq({
                id: 1,
                name: "cerulean",
                year: 2000,
                color: "#98B2D1",
                pantone_value: "15-4020"
            })
        })
    })

    it('Get several resources and verify their length to equal 6', () => {
        getResource.getListOfResources(1).then((resource) => {
            expect(resource).to.have.lengthOf(6)
        })
    })
    
})