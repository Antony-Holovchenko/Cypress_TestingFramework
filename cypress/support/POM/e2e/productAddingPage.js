class addItems {
    elements = {
        cart: () => cy.get(':nth-child(4) > .btn'),
        cardNum: () => cy.get(':nth-child(1) > .field > .input'),
        cardMothExpiry: () => cy.get('select:nth-child(2)'),
        cardDayExpiry: () => cy.get('select:nth-child(3)'),
        cardName: () => cy.get(':nth-child(3) > .field > .input'),
        cvv: () => cy.get(':nth-child(2) > :nth-child(2) > .input'),
        country: () => cy.get('input[placeholder="Select Country"]'),
        countryResult: () => cy.get('span[class="ng-star-inserted"]'),
        csv: () => cy.get('.order-summary button'),
        orders: () => cy.get(':nth-child(3) > .btn'),
        deleteBtn: () => cy.get('button[class="btn btn-danger"]'),
        sidebarCheckboxes: () => cy.get('div input[type="checkbox"]'),
        productName: () => cy.get('h5')
    }

    getProductName() {
        this.elements.productName()
    }

    goToCatr() {
        this.elements.cart().click()
    }

    checkout() {
        cy.contains('Checkout').click()
    }

    enterCardDetails(cardNumber, expMonth, expDay, cardName, cvvCode) {
        this.elements.cardNum().clear().type(cardNumber)
        this.elements.cardMothExpiry().select(expMonth)
        this.elements.cardDayExpiry().select(expDay)
        this.elements.cardName().type(cardName)
        this.elements.cvv().type(cvvCode)
    }

    selectCountryAndContinue(country) {
        this.elements.country().type(country)
        this.elements.countryResult().each(($el, index, $list) => {
            if($el.text().includes('Ukraine')) {
                cy.wrap($el).eq(index).click()
            }
        })
        cy.contains('Place Order ').click()
    }

    downloadCSVDetailsFile(){
        cy.wait(2000)
        this.elements.csv().click()
    }

    deleteIemsFromCart() {
        this.elements.cart().click()
        this.elements.deleteBtn().each(($el, index, $list) => {
            cy.wrap($el).click()        
        })
    }

    checkFashioCheckbox() {
        this.elements.sidebarCheckboxes().each(($el, index, $list) => {
            return index === 10 ? cy.wrap($el).check({force:true}) : 'false'
        })
        cy.wait(1000)
    }
    checkElectronicsCheckbox() {
        //First uncheck previous checkbox 
        this.elements.sidebarCheckboxes().each(($el, index, $list) => {
            return index === 10 ? cy.wrap($el).uncheck({force:true}) : 'false'
        })

        //Check the new one
        this.elements.sidebarCheckboxes().each(($el, index, $list) => {
            return index === 11 ? cy.wrap($el).check({force:true}) : 'false'  
        })
    }

    
} 

module.exports = new addItems()