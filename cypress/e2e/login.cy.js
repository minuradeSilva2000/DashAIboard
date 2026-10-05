describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://dev.dashaibee.com/', { waitUntil: 'domcontentloaded' })
  })

  it('check input invalid password', () => {
    cy.visit('https://dev.dashaibee.com/login', { waitUntil: 'domcontentloaded' })

    cy.get('input[placeholder="Enter email"]').type('admin@dashai.local')
    cy.get('input[placeholder="Enter password"]').type('Admin@2026!')

    cy.get('button[type="submit"]').click()

    cy.contains('Invalid username or password', { timeout: 30000 }).should('be.visible')

    cy.window().should((win) => {
      expect(win.localStorage.getItem('token'), 'auth token').to.be.null
    })
  })
})
