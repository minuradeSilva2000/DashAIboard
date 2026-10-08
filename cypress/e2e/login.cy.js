describe('Login Authentication Validation', () => {
  it('passes', () => {
    cy.visit('https://dev.dashaibee.com/', { waitUntil: 'domcontentloaded' })
  })

  it('check input valid password', () => {
    cy.visit('https://dev.dashaibee.com/login', { waitUntil: 'domcontentloaded' })

    cy.get('input[placeholder="Enter email"]').type('admin@dashai.local')
    cy.get('input[placeholder="Enter password"]').type('Admin@2026!')

    cy.intercept('POST', '**/api/auth/login').as('login')

    cy.get('button[type="submit"]').click()

    cy.wait('@login').then(({ response }) => {
      expect(response.statusCode, 'login API status').to.eq(200)
    })

    cy.window({ timeout: 30000 }).should((win) => {
      expect(win.localStorage.getItem('token'), 'auth token').to.not.be.null
    })

    cy.get('#login-error').should('not.exist')

    cy.get('input[placeholder="Enter password"]').should('not.exist')

    cy.contains('Dashboards', { timeout: 30000 }).should('be.visible')
  })
})