const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: "https://rahulshettyacademy.com/client",
    specPattern: "cypress/tests/API_tests",
    downloadsFolder: "cypress/downloads/",
    reporter: 'mochawesome',
    responseTimeout: 30000,
    experimentalSessionAndOrigin: true
  },
  env: {
    apiUrl: "https://reqres.in/api"
  }
})