describe('Lookup page Navigation Test Suite', () => {

  beforeEach(() => {
    cy.visit('https://dev.dashaibee.com/login', { waitUntil: 'domcontentloaded' })
    cy.get('input[placeholder="Enter username"]').type('admin')
    cy.get('input[placeholder="Enter password"]').type('Admin@2026!')
    cy.get('button[type="submit"]').click()

    cy.window().should((win) => {
      expect(win.localStorage.getItem('token'), 'auth token').to.be.a('string')
    })

    cy.visit('https://dev.dashaibee.com/', { waitUntil: 'domcontentloaded' })
  })

  it('Verify that the Shipment dropdown allows users to select an organization', () => {
    cy.get('.p-dropdown', { timeout: 30000 }).eq(0).should('have.class', 'p-inputwrapper-filled', { timeout: 30000 }).click()
    cy.get('.p-dropdown-panel .p-dropdown-item', { timeout: 30000 }).contains('Shipment-Test2').click()
     cy.get('.p-dropdown-label', { timeout: 30000 }).eq(0).should('be.visible').and('contain.text', 'Shipment-Test2')
     cy.wait(6000)
  })

  it('should show correct results when FlexiPrint is selected', () => {
    cy.contains('View as:').parent().find('select').select('🏢 FlexiPrint').should('have.value', '2')
    cy.get('.h-full.p-4.sm\\:p-6.overflow-y-auto.sm\\:overflow-hidden').should('not.be.empty')
  })
  

})
