const openNewDashboard = (attempt = 0) => {
  cy.clickStable('button.breadcrumb-switcher', { timeout: 60000 })
  cy.wait(1000)

  cy.get('body').then(($body) => {
    const target = [...$body[0].querySelectorAll('[role="menuitem"]')].find((el) => /new.*dashboard/i.test(el.textContent || ''))

    if (target) {
      target.click()
      return
    }

    if (attempt >= 5) {
      const menuOpen = !!$body[0].querySelector('[role="menu"]')
      throw new Error('Dashboard switcher never showed the New Dashboard item (menu ' + (menuOpen ? 'open' : 'closed') + ')')
    }

    if ($body[0].querySelector('[role="menu"]')) {
      cy.get('button.breadcrumb-switcher').click()
    }

    cy.wait(2000)
    openNewDashboard(attempt + 1)
  })
}

describe('Lookup page Navigation Test Suite', () => {

  beforeEach(() => {
    cy.visit('https://dev.dashaibee.com/', { waitUntil: 'domcontentloaded' })
    cy.get('input[placeholder="Enter email"]').type('admin@dashai.local')
    cy.get('input[placeholder="Enter password"]').type('Admin@2026!')
    cy.get('button[type="submit"]').click()

    cy.window().should((win) => {
      expect(win.localStorage.getItem('token'), 'auth token').to.be.a('string')
    })

    cy.visit('https://dev.dashaibee.com/', { waitUntil: 'domcontentloaded' })
  })
   it('Verify switching from Dashboard to Database tab displays the Database schema browser correctly', () => {
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
    cy.wait(5000)
    })
    it('Verify user can open the Database tab and access the Add Schema dialog',()=>{
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
    cy.contains('button:visible', '+ Schema', { timeout: 60000 }).should('be.visible').click()
    cy.get('div.shadow-2xl', { timeout: 60000 }).should('be.visible')
    cy.get('input[placeholder="Schema name"]', { timeout: 60000 }).should('be.visible')
    cy.contains('button:visible', 'Confirm').should('be.visible')
     cy.wait(5000)
  })
  it('Verify user can open the Database tab and access the Add Schema dialog create car schema',()=>{
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
    cy.contains('button:visible', '+ Schema', { timeout: 60000 }).should('be.visible').click()
    cy.get('div.shadow-2xl', { timeout: 60000 }).should('be.visible')
    cy.get('input[placeholder="Schema name"]', { timeout: 60000 }).should('be.visible')
    cy.contains('button:visible', 'Confirm').should('be.visible')
    cy.get('input[placeholder="Schema name"]').type('cars')
    cy.get('input[placeholder="e.g. 2 for FlexiPrint, 3 for Shipment — leave blank for Unassigned"]').type('4')
    cy.contains('button','Confirm').click()
    cy.get('div.shadow-2xl', { timeout: 60000 }).should('be.visible')
     cy.wait(5000)
  })
   it('Verify SQL script Import Dialog Opens for Selected Database Schema ',()=>{

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

    cy.get('button.w-full.text-left', { timeout: 60000 }).should('have.length.greaterThan', 1).eq(31).should('not.be.empty').then(($schemaBtn) => {
        const schemaName = $schemaBtn.text().trim().replace(/^[^\p{L}\p{N}_]+/u, '').trim()
        expect(schemaName, 'schema name').to.not.be.empty
        $schemaBtn.click()
    cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', `Schema: ${schemaName}`) })
     cy.contains('button:visible', 'Import', { timeout: 60000 }).should('be.visible').click() 
     cy.contains('button:visible', 'SQL Script', { timeout: 60000 }).should('be.visible').click()
     cy.get('div.rounded-2xl.shadow-2xl.w-full.max-w-2xl', { timeout: 60000 }).should('be.visible').and('contain.text', 'Import SQL Script')
     cy.get('div.rounded-2xl.shadow-2xl.w-full.max-w-2xl input[type="file"]', { timeout: 60000 }).selectFile('cypress/fixtures/carcount.sql')
     cy.contains('button:visible', 'Upload & Validate', { timeout: 60000 }).should('be.visible').click()
     cy.get('div.rounded-2xl.shadow-2xl.w-full.max-w-2xl', { timeout: 60000 }).should('be.visible').contains('button', 'Import', { timeout: 60000 }).should('be.visible').click()
     cy.wait(5000)
    
     

    })
    it('Verify SQL Import, Domain Prompt Creation, and New Dashboard Creation',()=>{

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
    let schemaName = ''
    cy.get('button.w-full.text-left', { timeout: 60000 }).should('have.length.greaterThan', 1).eq(31).should('not.be.empty').then(($schemaBtn) => {
        schemaName = $schemaBtn.text().trim().replace(/^[^\p{L}\p{N}_]+/u, '').trim()
        expect(schemaName, 'schema name').to.not.be.empty
        $schemaBtn.click()
    cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', `Schema: ${schemaName}`) })
     cy.contains('button:visible', 'Import', { timeout: 60000 }).should('be.visible').click() 
     cy.contains('button:visible', 'SQL Script', { timeout: 60000 }).should('be.visible').click()
     cy.get('div.rounded-2xl.shadow-2xl.w-full.max-w-2xl', { timeout: 60000 }).should('be.visible').and('contain.text', 'Import SQL Script')
     cy.get('div.rounded-2xl.shadow-2xl.w-full.max-w-2xl input[type="file"]', { timeout: 60000 }).selectFile('cypress/fixtures/carcount.sql')
     cy.contains('button:visible', 'Upload & Validate', { timeout: 60000 }).should('be.visible').click()
     cy.get('div.rounded-2xl.shadow-2xl.w-full.max-w-2xl', { timeout: 60000 }).should('be.visible').contains('button', 'Import', { timeout: 60000 }).should('be.visible').click()
     cy.wait(5000)
     cy.contains('button:visible', '+ Add Domain Prompt', { timeout: 60000 }).should('be.visible').click()
     cy.get('div.fixed.inset-0.z-50.flex.flex-col', { timeout: 60000 }).should('be.visible').and('contain.text', 'Prompt Manager')
     cy.get('div.fixed.inset-0.z-50.flex.flex-col', { timeout: 60000 }).find('button.flex-1.text-left.text-sm', { timeout: 60000 }).should('have.length.greaterThan', 1)
     cy.contains('button:visible', ' New section', { timeout: 60000 }).should('be.visible').click()
     cy.wait(5000)
     cy.get('div.flex.flex-1.flex-col.gap-3.min-w-0.min-h-0.overflow-hidden', { timeout: 60000 }).should('be.visible')
     cy.get('input[placeholder="Label (e.g. Warehousing Domain)"]', { timeout: 60000 }).should('be.visible').type(`cy_sql_${Date.now()}`)
     cy.contains('button', 'Create section', { timeout: 60000 }).should('be.visible').and('not.be.disabled').click()
     cy.get('div.fixed.inset-0.z-50.flex.flex-col', { timeout: 60000 }).contains('button', /^Back$/, { timeout: 60000 }).should('be.visible').click()
     cy.get('main', { timeout: 60000 }).should('be.visible')
     cy.get('[data-dashboard-export-root]').should('not.exist')
     cy.get('main').should('contain.text', `Schema: ${schemaName}`)
     cy.contains('button[role="tab"]', 'Dashboard', { timeout: 60000 }).should('be.visible').click()
     cy.contains('button[role="tab"]', 'Dashboard', { timeout: 60000 }).should('have.attr', 'aria-selected', 'true')
     cy.get('[data-dashboard-export-root]', { timeout: 60000 }).should('be.visible')
     openNewDashboard()
     cy.get('input[placeholder="Dashboard name"]', { timeout: 60000 }).should('be.visible').and('have.value', '').type('car dashbord').should('have.value', 'car dashbord').type('{enter}')
     cy.get('input[placeholder="Dashboard name"]', { timeout: 60000 }).should('not.exist')
     cy.get('button.breadcrumb-switcher', { timeout: 60000 }).should('contain.text', 'car dashbord')
    })
    
})
 
