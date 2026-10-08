describe('Verify userorganize Schema and Table Management Workflow', () => {

  beforeEach(() => {
    cy.visit('https://dev.dashaibee.com/login', { waitUntil: 'domcontentloaded' })
    cy.get('input[placeholder="Enter email"]').type('chanudishehani33+test1@gmail.com')
    cy.get('input[placeholder="Enter password"]').type('siyoth123')
    cy.get('button[type="submit"]').click()

    cy.window().should((win) => {
      expect(win.localStorage.getItem('token'), 'auth token').to.be.a('string')
    })

    cy.visit('https://dev.dashaibee.com/', { waitUntil: 'domcontentloaded' })
  })
  it('Verify user can enter an organization name and continue', () => {

     cy.get('div[id="root"]').should('be.visible')
     cy.get('div.onb-card.mt-7.p-5',{timeout:60000}).should('be.visible')
     cy.get('label[for="onboarding-org-name"]',{timeout:60000}).should('be.visible').and('contain.text','Organization name')
     cy.get('input[placeholder="e.g. Acme Analytics"]').should('be.visible').type('vehicle')
     cy.wait(5000)
     cy.contains('button.onb-btn-primary','Continue').should('be.visible').click()
     cy.wait(5000)

  })
   it('Verify user can complete organization setup and continue with Free plan', () => {

     cy.get('div[id="root"]').should('be.visible')
     cy.get('div.onb-card.mt-7.p-5',{timeout:60000}).should('be.visible')
     cy.get('label[for="onboarding-org-name"]',{timeout:60000}).should('be.visible').and('contain.text','Organization name')
     cy.get('input[placeholder="e.g. Acme Analytics"]').should('be.visible').type('vehicle')
     cy.wait(5000)
     cy.contains('button.onb-btn-primary','Continue').should('be.visible').click()
     cy.wait(5000)
     cy.contains('button.onb-btn-primary','Continue with Free').should('be.visible').click()
     cy.get('div.w-full.flex.flex-col').should('be.visible')
     cy.wait(5000)
  })
})