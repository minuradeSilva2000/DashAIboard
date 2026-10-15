describe('Verify organiztion test', () => {

  beforeEach(() => {
    cy.visit('https://dev.dashaibee.com/login', { waitUntil: 'domcontentloaded' })
    cy.get('input[placeholder="Enter email"]').type('admin@dashai.local')
    cy.get('input[placeholder="Enter password"]').type('Admin@2026!')
    cy.get('button[type="submit"]').click()

    cy.window().should((win) => {
      expect(win.localStorage.getItem('token'), 'auth token').to.be.a('string')
    })

    cy.visit('https://dev.dashaibee.com/', { waitUntil: 'domcontentloaded' })
  })
 it('Verify Dashboard and Database Tab Navigation and User Settings Access', () => {
    cy.get('div[id="root"]').should('be.visible')
    cy.get('[data-dashboard-export-root]', { timeout: 150000 }).should('be.visible').and('not.be.empty')
    cy.contains('button[role="tab"]', 'Dashboard').should('be.visible').and('have.attr', 'aria-selected', 'true')
    cy.contains('button[role="tab"]', 'Database').should('be.visible').and('have.attr', 'aria-selected', 'false')
    cy.contains('button[role="tab"]', 'Database').click()
    cy.contains('button[role="tab"]', 'Database', { timeout: 60000 }).should('have.attr', 'aria-selected', 'true').and('have.attr', 'data-active', 'true')
    cy.contains('button[role="tab"]', 'Dashboard').should('have.attr', 'aria-selected', 'false')
    cy.get('main', { timeout: 60000 }).should('be.visible')
    cy.get('[data-dashboard-export-root]').should('not.exist')
    cy.get('main').should('contain.text', 'Select a schema to browse its tables.')
    cy.get('button[aria-label="User menu"]').filter(':visible').first().click();
    cy.wait(1000);
    cy.contains('button', 'Settings').filter(':visible').first().should('be.visible').click();
    cy.wait(15000)
 })

 it('Verify database tab navigation and organization settings access', () => {

    cy.get('div[id="root"]').should('be.visible')
    cy.get('[data-dashboard-export-root]', { timeout: 150000 }).should('be.visible').and('not.be.empty')
    cy.contains('button[role="tab"]', 'Dashboard').should('be.visible').and('have.attr', 'aria-selected', 'true')
    cy.contains('button[role="tab"]', 'Database').should('be.visible').and('have.attr', 'aria-selected', 'false')
    cy.contains('button[role="tab"]', 'Database').click()
    cy.contains('button[role="tab"]', 'Database', { timeout: 60000 }).should('have.attr', 'aria-selected', 'true').and('have.attr', 'data-active', 'true')
    cy.contains('button[role="tab"]', 'Dashboard').should('have.attr', 'aria-selected', 'false')
    cy.get('main', { timeout: 60000 }).should('be.visible')
    cy.get('[data-dashboard-export-root]').should('not.exist')
    cy.get('main').should('contain.text', 'Select a schema to browse its tables.')
    cy.get('button[aria-label="User menu"]').filter(':visible').first().click();
    cy.wait(1000);
    cy.contains('button', 'Settings').filter(':visible').first().should('be.visible').click();
    cy.wait(5000)
    cy.get('nav.flex-1.py-3.overflow-y-auto.overflow-x-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', 'Organization')
    cy.contains('nav.flex-1.py-3.overflow-y-auto.overflow-x-hidden button', 'Organizations', { timeout: 60000 }).should('be.visible').click()
    cy.get('main.flex-1.min-h-0.overflow-hidden.flex.flex-col', { timeout: 60000 }).should('be.visible').and('contain.text', 'New Organization')
  

})

})