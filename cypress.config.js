const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://rahulshettyacademy.com/client",
    specPattern: "cypress/tests/e2e_tests/",
    downloadsFolder: "cypress/downloads/",
    reporter: 'mochawesome',
    responseTimeout: 30000,
    experimentalSessionAndOrigin: true
  }
})