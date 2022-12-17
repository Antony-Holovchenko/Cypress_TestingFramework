const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'vnbfb9',
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
    apiUrl: "https://reqres.in/api",
    CYPRESS_RECORD_KEY: "14ee76a6-6308-416c-b5a0-35d3ee4846be"
  }
})