describe('verify when user contioue with google account userorganize Schema and Table Management Workflow', () => {

  it('Verify the application homepage loads successfully', () => {
    cy.visit('https://dev.dashaibee.com/', { waitUntil: 'domcontentloaded' })
   cy.wait(5000)
})

  it('Verify Google Sign-In Button Visibility and Click Functionality', () => {
    cy.visit('https://dev.dashaibee.com/', { waitUntil: 'domcontentloaded' })
    cy.contains('span.nsm7Bb-HzV7m-LgbsSe-BPrWId', 'Google සමඟ කරගෙන යන්න', { timeout: 30000 }).should('be.visible').click()
    cy.wait(5000)
})

 it('Verify Google Sign-In and Email Entry Workflow via OAuth', () => {

  cy.on('uncaught:exception', (err) => {
    if (err.message.includes('RPC executor service threw an error')) {
      return false
    }
  })

  cy.visit('https://dev.dashaibee.com/', {
    waitUntil: 'domcontentloaded'
  })

  cy.window().then((win) => {
    cy.stub(win, 'open').as('googleSignIn')
  })

  cy.contains('span.nsm7Bb-HzV7m-LgbsSe-BPrWId','Google සමඟ කරගෙන යන්න',{ timeout: 30000 }).should('be.visible').click()

  cy.get('@googleSignIn').then((stub) => {
    const oauthUrl = stub.args[0][0]

    expect(oauthUrl, 'Google OAuth URL').to.include('accounts.google.com')

    cy.origin(
      'https://accounts.google.com',
      { args: { oauthUrl } },
      ({ oauthUrl }) => {
        cy.visit(oauthUrl)

        cy.get('#identifierId', { timeout: 30000 }).should('be.visible').type('minurasiyoth@gmail.com')

        cy.get('#identifierId').should('have.value', 'minurasiyoth@gmail.com')

        cy.contains('button', 'Next').should('be.visible').click()
      }
    )
  })
})
})
