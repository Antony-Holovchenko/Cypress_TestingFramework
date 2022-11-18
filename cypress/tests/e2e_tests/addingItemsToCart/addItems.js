import shop from '../../../support/POM/e2e/addItemsPage'
// !!! Remember -> when you change teh email in login.json file, then when you will execute this test, you should also change the file-name if readFile function
// Example: "/cyprss/downloads/order-invoice_sam34.csv"
// "sam34" - this is the characters in your email 

describe('Shop test', () => {
    beforeEach(function() {
        cy.fixture('login').then((data) => {
            this.data = data
        })
        cy.fixture('addItems').then((data) => {
            this.dataItems = data
        })
        cy.visit('/')
    })

    it('Add items to cart and check their sum', function() {
        let sum = 0
        let actualResult = 0 
        cy.login(this.data.email, this.data.password)
        this.dataItems.products.forEach((element) => { //select all needed products
            cy.selectProduct(element)
        })
        shop.goToCatr()
    
         cy.get('.prodTotal').each(($el, index, $list) => { //take all prices near selected products 
            const num = $el.text().split(" ") // separate $ character
            let res = Number(num[1]) //create from string -> number
            sum = sum + res 
        })
        
        cy.get(':nth-child(2) > .value').then((elem) => {
            const totalSum = elem.text().replace(/[^0-9]/g, '') //delete $ character and left only numbers
            actualResult = Number(totalSum)
            expect(sum).to.equal(actualResult)
        })

        shop.checkout()
        shop.enterCardDetails(this.dataItems.cardNumber, this.dataItems.expiryMonth,this.dataItems.expiryDay, this.dataItems.cardname, this.dataItems.cvv)
        shop.selectCountryAndContinue(this.dataItems.country)
        shop.downloadCSVDetailsFile()
        cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_sam34.csv").then(function (text) { // verify the order file has our selected  products
            //cy.log(text)
            expect(text.includes(this.dataItems.products[2])).to.be.false
            expect(text.includes(this.dataItems.products[0])).to.be.true
            expect(text.includes(this.dataItems.products[1])).to.be.true
        })

    })

})