import shop from '../../../support/POM/e2e/productAddingPage'
import login from '../../../fixtures/login.json'
import productInfo from '../../../fixtures/addItems.json'
//Remeber to change characters after invoice_... according to your email
// Example: "/cyprss/downloads/order-invoice_sam34.csv"
// "sam34" - this is the characters in your email 
//Attention, sometimes Cypress doesn't download files in Chrome, and you can try another browsers for this test suit

describe('Shop test', () => {
    beforeEach(function() {
        cy.login(login.email, login.password)
    })

    it('Add items to cart and check their sum', function() {
        cy.visit('/')
        let sum = 0
        let actualResult = 0 
        productInfo.products.forEach((element) => { //select all needed products
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
        shop.enterCardDetails(productInfo.cardNumber, productInfo.expiryMonth,productInfo.expiryDay, productInfo.cardname, productInfo.cvv)
        shop.selectCountryAndContinue(productInfo.country)
        shop.downloadCSVDetailsFile()
        cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_sam333.csv").then(function (text) { // verify the order file has our selected  products
            //cy.log(text)
            expect(text.includes(productInfo.products[2])).to.be.false
            expect(text.includes(productInfo.products[0])).to.be.true
            expect(text.includes(productInfo.products[1])).to.be.true
        })

    })

    it("Successfull deleting items from cart tab", function () {
        cy.visit('/')
        productInfo.products.forEach((element) => { //select all needed products
            cy.selectProduct(element)
        })
        shop.deleteIemsFromCart()
        cy.location('pathname').should('eq', '/client/dashboard/cart')
        cy.get('.ng-star-inserted > h1').then((elemText) => {
            expect(elemText.text()).to.equal('No Products in Your Cart !')
        })
    })

    it("Checkboxes should filter the products on the page", function () {
        cy.visit('/')
        shop.checkFashioCheckbox()
        shop.elements.productName().should('have.length', 2)
        shop.elements.productName().each(($el, index, $list) => {
            const elemText = $el.text()
            expect(elemText).to.not.include(productInfo.products[1])
        })
        shop.checkElectronicsCheckbox()
        shop.elements.productName().should('have.length', 1)
        cy.wait(1000)
        shop.elements.productName().each(($el, index, $list) => {
            const elemText = $el.text()
            expect(elemText).to.include(productInfo.products[1])
        }) 
         
    })

})