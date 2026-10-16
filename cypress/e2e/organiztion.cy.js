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
    cy.wait(5000)

 })
  it('Verify Database Tab and Create Organization Form', () => {

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
    cy.contains('button', 'New Organization').and('be.visible').click()
    cy.get('form.rounded-xl.p-4.space-y-4.border.shadow-sm').should('be.visible')
    cy.wait(5000)

 })
  it('Verify Database Navigation and Organization Form Functionality', () => {

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
    cy.contains('button', 'New Organization').and('be.visible').click()
    cy.get('form.rounded-xl.p-4.space-y-4.border.shadow-sm').should('be.visible')
    cy.get('form.rounded-xl.p-4.space-y-4.border.shadow-sm input[placeholder="Organization name"]').should('be.visible').type('Test Organization')
    cy.get('form.rounded-xl.p-4.space-y-4.border.shadow-sm select').should('have.length', 1).select('Free').should('have.value', '1')
    cy.get('form.rounded-xl.p-4.space-y-4.border.shadow-sm input[type="checkbox"]').should('be.visible').check().should('be.checked')
    cy.get('form.rounded-xl.p-4.space-y-4.border.shadow-sm input[type="text"]').eq(1).should('be.visible').type('Test Description')
    cy.get('form.rounded-xl.p-4.space-y-4.border.shadow-sm input[type="email"]').should('be.visible').type('test@example.com')
    cy.wait(5000)
 
 
 
  })
    it('Verify Successful Organization Creation by Submitting Valid Organization Details', () => {

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
    cy.contains('button', 'New Organization').and('be.visible').click()
    cy.get('form.rounded-xl.p-4.space-y-4.border.shadow-sm').should('be.visible')
    cy.get('form.rounded-xl.p-4.space-y-4.border.shadow-sm input[placeholder="Organization name"]').should('be.visible').type('Test Organizationschool')
    cy.get('form.rounded-xl.p-4.space-y-4.border.shadow-sm select').should('have.length', 1).select('Free').should('have.value', '1')
    cy.get('form.rounded-xl.p-4.space-y-4.border.shadow-sm input[type="checkbox"]').should('be.visible').check().should('be.checked')
    cy.get('form.rounded-xl.p-4.space-y-4.border.shadow-sm input[type="text"]').eq(1).should('be.visible').type('Test Descriptiontype')
    cy.get('form.rounded-xl.p-4.space-y-4.border.shadow-sm input[type="email"]').should('be.visible').type('test235@example.com')
    cy.get('form.rounded-xl.p-4.space-y-4.border.shadow-sm button[type="submit"]').should('be.visible').click()
    cy.wait(5000)
 
 
 
  })
  it('Verify Organization Search and Expand Details Functionality',()=>{

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
    cy.get('input[placeholder="Search by name or ID…"]', { timeout: 60000 }).should('be.visible').type('Alex Sales')
    cy.wait(5000)
    cy.get('button[title="Expand details"]', { timeout: 60000 }).filter(':visible').first().should('be.visible').click()
   cy.get('button[title="Collapse details"]', { timeout: 60000 }).should('be.visible')
   cy.wait(5000)
    


  })
  it('Verify Organization filtering and Expand Details Functionality',()=>{

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
    cy.get('select.w-full.sm\\:w-auto.text-sm.rounded-lg.px-3.py-2').should('be.visible').select('Pro').should('have.value', '2')
   cy.get('button[title="Expand details"]', { timeout: 60000 }).filter(':visible').first().should('be.visible').click()
    cy.get('button[title="Collapse details"]', { timeout: 60000 }).should('be.visible')
    cy.wait(5000)
  })
   it('Verify Organization Management and Edit Plan and Limits Workflow', () => {

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
    cy.contains('div.flex.flex-col.sm\\:flex-row.sm\\:items-center.sm\\:justify-between.gap-2', 'AAPAN Test', { timeout: 60000 }).should('be.visible').and('contain.text', 'AAPAN Test')
    cy.contains('div.flex.flex-col.sm\\:flex-row.sm\\:items-center.sm\\:justify-between.gap-2', 'AAPAN Test').find('button[title="Edit plan and limits"]', { timeout: 60000 }).should('have.length', 1).and('be.visible').click()
    cy.get('form.rounded-xl.p-4.space-y-3.border.shadow-sm').should('be.visible')
    cy.wait(5000)

  })
   it('Verify Organization Management and verify  Edit Plan and Limits Workflow suceesfully', () => {

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
    cy.contains('div.flex.flex-col.sm\\:flex-row.sm\\:items-center.sm\\:justify-between.gap-2', 'AAPAN Test', { timeout: 60000 }).should('be.visible').and('contain.text', 'AAPAN Test')
    cy.contains('div.flex.flex-col.sm\\:flex-row.sm\\:items-center.sm\\:justify-between.gap-2', 'AAPAN Test').find('button[title="Edit plan and limits"]', { timeout: 60000 }).should('have.length', 1).and('be.visible').click()
    cy.get('form.rounded-xl.p-4.space-y-3.border.shadow-sm').should('be.visible')
    cy.get('form.rounded-xl.p-4.space-y-3.border.shadow-sm select').should('have.length', 1).select('Pro').should('have.value', '2')
    cy.get('form.rounded-xl.p-4.space-y-3.border.shadow-sm button[type="submit"]').should('be.visible').click()
    cy.get('form.rounded-xl.p-4.space-y-3.border.shadow-sm', { timeout: 60000 }).should('not.exist')
    cy.contains('div.flex.flex-col.sm\\:flex-row.sm\\:items-center.sm\\:justify-between.gap-2', 'AAPAN Test', { timeout: 60000 }).should('contain.text', 'Plan: Pro')
    cy.contains('Organization updated', { timeout: 60000 }).should('be.visible')

  })
   it('Verify Organization Deactivation Workflow suceesfully', () => {

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
    cy.contains('div.flex.flex-col.sm\\:flex-row.sm\\:items-center.sm\\:justify-between.gap-2', 'Alex Sales', { timeout: 60000 }).should('be.visible').and('contain.text', 'Alex Sales') 
      cy.contains('div.flex.flex-col.sm\\:flex-row.sm\\:items-center.sm\\:justify-between.gap-2', 'Alex Sales').find('button[title="Click to deactivate"]', { timeout: 60000 }).should('have.length', 1).and('be.visible').click()
   



  })

})