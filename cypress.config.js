const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'vnbfb9',
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: "https://rahulshettyacademy.com/client",
    specPattern: "cypress/tests",
    downloadsFolder: "cypress/downloads/",
    reporter: 'mochawesome',
    responseTimeout: 30000,
    experimentalSessionAndOrigin: true
  },
  env: {
    apiUrl: "https://reqres.in/api"
  }
})