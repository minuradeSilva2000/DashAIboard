describe('verify when user contioue with google account userorganize Schema and Table Management Workflow', () => {


  it('Verify the application homepage loads successfully', () => {
    cy.visit('https://dev.dashaibee.com/', { waitUntil: 'domcontentloaded' })
  })
 it('Verify Google Sign-In Button Visibility and Click Functionality', () => {

    cy.visit('https://dev.dashaibee.com/', { waitUntil: 'domcontentloaded' })
    cy.contains('span.nsm7Bb-HzV7m-LgbsSe-BPrWId','Google සමඟ කරගෙන යන්න',{ timeout: 30000 }).should('be.visible').click()
 })
})