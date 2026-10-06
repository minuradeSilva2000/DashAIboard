const SIGN_IN_ERROR = /too many (sign-in )?attempts|please wait a few minutes|invalid (email|username)|sign-in failed|temporarily unavailable|not allowed to sign in/i

const BACKOFF_MS = [60000, 120000, 180000]

const signIn = (attempt = 0) => {
  cy.get('input[placeholder="Enter email"]', { timeout: 60000 }).should('be.visible').clear().type('admin@dashai.local')
  cy.get('input[placeholder="Enter password"]', { timeout: 60000 }).should('be.visible').clear().type('Admin@2026!')
  cy.get('button[type="submit"]', { timeout: 60000 }).should('be.visible').and('not.be.disabled')

  const clickedAt = Date.now()
  cy.get('button[type="submit"]').click()

  cy.get('body', { timeout: 60000 }).should(($body) => {
    const doc = $body[0].ownerDocument
    const token = doc.defaultView.localStorage.getItem('token')
    const errorShown = SIGN_IN_ERROR.test($body.text())
    const submitting = !!doc.querySelector('button[type="submit"][disabled]')
    const settled = !submitting && Date.now() - clickedAt > 5000
    expect(typeof token === 'string' || errorShown || settled, 'sign-in settled: auth token, sign-in error, or idle form').to.be.true
  }).then(($body) => {
    const doc = $body[0].ownerDocument
    if (typeof doc.defaultView.localStorage.getItem('token') === 'string') return
    if (!doc.querySelector('input[placeholder="Enter email"]')) {
      throw new Error('Sign-in left the login page without an auth token: ' + $body.text().slice(0, 300))
    }
    if (attempt >= BACKOFF_MS.length) {
      throw new Error('Sign-in failed after retries: ' + $body.text().slice(0, 300))
    }
    cy.log(`sign-in attempt ${attempt + 1} failed, backing off ${BACKOFF_MS[attempt]}ms`)
    cy.wait(BACKOFF_MS[attempt])
    signIn(attempt + 1)
  })
}

const signInOnce = () => {
  cy.session('admin@dashai.local', () => {
    cy.visit('https://dev.dashaibee.com/login', { waitUntil: 'domcontentloaded' })

    signIn()

    cy.contains('button[role="tab"]', 'Dashboard', { timeout: 60000 }).should('be.visible')

    cy.window({ timeout: 60000 }).should((win) => {
      expect(win.localStorage.getItem('token'), 'auth token').to.be.a('string').and.not.be.empty
    })
  })
}

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
    signInOnce()

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

   it('Verify user can open the Database tab and access the Add Schema dialog create vehicle schema',()=>{
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
    cy.get('input[placeholder="Schema name"]').type('vehicls8')
    cy.get('input[placeholder="e.g. 2 for FlexiPrint, 3 for Shipment — leave blank for Unassigned"]').type('7')
    cy.contains('button','Confirm').click()
    cy.get('div.shadow-2xl', { timeout: 60000 }).should('be.visible')
     cy.wait(5000)
  })
    it('Verify selecting a database schema displays the corresponding schema details ',()=>{

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
      cy.wait(5000)
    })
    it('Verify CSV/Excel Import Dialog Opens for Selected Database Schema ',()=>{

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
     cy.contains('button:visible', 'CSV / Excel', { timeout: 60000 }).should('be.visible').click()
     cy.get('div.rounded-2xl.shadow-2xl.w-full.max-w-3xl', { timeout: 60000 }).should('be.visible').and('contain.text', 'Import CSV / Excel')
     cy.get('input[type="file"]', { timeout: 60000 }).selectFile('cypress/fixtures/vehicles_dataset2.csv')
     cy.wait(5000)

    })
    it('Verify CSV File Upload and Preview Data Successfully for the Selected Database Schema ',()=>{

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
     cy.contains('button:visible', 'CSV / Excel', { timeout: 60000 }).should('be.visible').click()
     cy.get('div.rounded-2xl.shadow-2xl.w-full.max-w-3xl', { timeout: 60000 }).should('be.visible').and('contain.text', 'Import CSV / Excel')
     cy.get('input[type="file"]', { timeout: 60000 }).selectFile('cypress/fixtures/vehicles_dataset2.csv')
     cy.contains('button:visible', 'Upload & Preview', { timeout: 60000 }).should('be.visible').click()


    })
    it('Verify Successful CSV Upload and Navigation to Column Configuration ',()=>{

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
     cy.contains('button:visible', 'CSV / Excel', { timeout: 60000 }).should('be.visible').click()
     cy.get('div.rounded-2xl.shadow-2xl.w-full.max-w-3xl', { timeout: 60000 }).should('be.visible').and('contain.text', 'Import CSV / Excel')
     cy.get('input[type="file"]', { timeout: 60000 }).selectFile('cypress/fixtures/vehicles_dataset2.csv')
     cy.contains('button:visible', 'Upload & Preview', { timeout: 60000 }).should('be.visible').click()
     cy.contains('button:visible','Next: Configure Columns', { timeout: 60000 }).should('be.visible').click()
     cy.wait(5000)
    })
     it('Verify CSV Column Selection, Primary Key Configuration and Navigation to Target Table ',()=>{

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
     cy.contains('button:visible', 'CSV / Excel', { timeout: 60000 }).should('be.visible').click()
     cy.get('div.rounded-2xl.shadow-2xl.w-full.max-w-3xl', { timeout: 60000 }).should('be.visible').and('contain.text', 'Import CSV / Excel')
     cy.get('input[type="file"]', { timeout: 60000 }).selectFile('cypress/fixtures/vehicles_dataset2.csv')
     cy.contains('button:visible', 'Upload & Preview', { timeout: 60000 }).should('be.visible').click()
     cy.contains('button:visible','Next: Configure Columns', { timeout: 60000 }).should('be.visible').click()
     cy.get('input[type=checkbox]',{timeout:60000}).should('have.length.greaterThan',1).eq(1).check({force:true})
     cy.wait(5000)
     cy.contains('button:visible','Next: Choose Target',{timeout:60000}).should('be.visible').click()
     cy.wait(5000)
    })

     it('Verify Complete CSV Import with Column and Primary Key Selection ',()=>{

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
     cy.contains('button:visible', 'CSV / Excel', { timeout: 60000 }).should('be.visible').click()
     cy.get('div.rounded-2xl.shadow-2xl.w-full.max-w-3xl', { timeout: 60000 }).should('be.visible').and('contain.text', 'Import CSV / Excel')
     cy.get('input[type="file"]', { timeout: 60000 }).selectFile('cypress/fixtures/vehicles_dataset2.csv')
     cy.contains('button:visible', 'Upload & Preview', { timeout: 60000 }).should('be.visible').click()
     cy.contains('button:visible','Next: Configure Columns', { timeout: 60000 }).should('be.visible').click()
     cy.get('input[type=checkbox]',{timeout:60000}).should('have.length.greaterThan',1).eq(1).check({force:true})
     cy.wait(5000)
     cy.contains('button:visible','Next: Choose Target',{timeout:60000}).should('be.visible').click()
     cy.wait(5000)
     cy.get('div.rounded-2xl.shadow-2xl.w-full.max-w-3xl', { timeout: 60000 }).contains('button:visible', 'Import', { timeout: 60000 }).should('be.visible').click()
     cy.wait(5000)
    })
    
     it('Verify CSV Dataset Import into Database Schema and Prompt Manager Section Creation',()=>{

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
     cy.contains('button:visible', 'CSV / Excel', { timeout: 60000 }).should('be.visible').click()
     cy.get('div.rounded-2xl.shadow-2xl.w-full.max-w-3xl', { timeout: 60000 }).should('be.visible').and('contain.text', 'Import CSV / Excel')
     cy.get('input[type="file"]', { timeout: 60000 }).selectFile('cypress/fixtures/vehicles_dataset2.csv')
     cy.contains('button:visible', 'Upload & Preview', { timeout: 60000 }).should('be.visible').click()
     cy.contains('button:visible','Next: Configure Columns', { timeout: 60000 }).should('be.visible').click()
     cy.get('input[type=checkbox]',{timeout:60000}).should('have.length.greaterThan',1).eq(1).check({force:true})
     cy.wait(5000)
     cy.contains('button:visible','Next: Choose Target',{timeout:60000}).should('be.visible').click()
     cy.wait(5000)
     cy.get('div.rounded-2xl.shadow-2xl.w-full.max-w-3xl', { timeout: 60000 }).find('input[type="text"]').first().clear().type(`cy_csv_${Date.now()}`, { force: true })
     cy.get('div.rounded-2xl.shadow-2xl.w-full.max-w-3xl', { timeout: 60000 }).contains('button:visible', 'Import', { timeout: 60000 }).should('be.visible').click()
     cy.contains('button:visible', '+ Add Domain Prompt', { timeout: 60000 }).should('be.visible').click()
    cy.get('div.fixed.inset-0.z-50.flex.flex-col', { timeout: 60000 }).should('be.visible').and('contain.text', 'Prompt Manager')
     cy.get('div.fixed.inset-0.z-50.flex.flex-col', { timeout: 60000 }).find('button.flex-1.text-left.text-sm', { timeout: 60000 }).should('have.length.greaterThan', 1)
     cy.contains('button:visible', ' New section', { timeout: 60000 }).should('be.visible').click()
     cy.wait(5000)
     cy.get('div.flex.flex-1.flex-col.gap-3.min-w-0.min-h-0.overflow-hidden', { timeout: 60000 }).should('be.visible')
     cy.get('input[placeholder="Label (e.g. Warehousing Domain)"]', { timeout: 60000 }).should('be.visible').and('not.have.value', '')
     cy.contains('button:visible', ' Create section', { timeout: 60000 }).should('be.visible').and('not.be.disabled').click()
     cy.wait(5000)
     cy.get('div.fixed.inset-0.z-50.flex.flex-col', { timeout: 60000 }).should('be.visible').and('contain.text', 'Prompt Manager')
   })
   it('verify the get  domin prompt in new sction and crete new dashbord and input click chabot and create chart',()=>{

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
    let tableName = ''
    cy.get('button.w-full.text-left', { timeout: 60000 }).should('have.length.greaterThan', 1).eq(31).should('not.be.empty').then(($schemaBtn) => {
        schemaName = $schemaBtn.text().trim().replace(/^[^\p{L}\p{N}_]+/u, '').trim()
        expect(schemaName, 'schema name').to.not.be.empty
        $schemaBtn.click()
     cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', `Schema: ${schemaName}`) })
     cy.contains('button:visible', 'Import', { timeout: 60000 }).should('be.visible').click() 
     cy.contains('button:visible', 'CSV / Excel', { timeout: 60000 }).should('be.visible').click()
     cy.get('div.rounded-2xl.shadow-2xl.w-full.max-w-3xl', { timeout: 60000 }).should('be.visible').and('contain.text', 'Import CSV / Excel')
     cy.get('input[type="file"]', { timeout: 60000 }).selectFile('cypress/fixtures/vehicles_dataset2.csv')
     cy.contains('button:visible', 'Upload & Preview', { timeout: 60000 }).should('be.visible').click()
     cy.contains('button:visible','Next: Configure Columns', { timeout: 60000 }).should('be.visible').click()
     cy.get('input[type=checkbox]',{timeout:60000}).should('have.length.greaterThan',1).eq(1).check({force:true})
     cy.wait(5000)
     cy.contains('button:visible','Next: Choose Target',{timeout:60000}).should('be.visible').click()
     cy.wait(5000)
      tableName = `cy_csv_${Date.now()}`
      cy.get('div.rounded-2xl.shadow-2xl.w-full.max-w-3xl', { timeout: 60000 }).find('input[type="text"]').first().clear().type(tableName, { force: true })
      cy.get('div.rounded-2xl.shadow-2xl.w-full.max-w-3xl', { timeout: 60000 }).contains('button:visible', 'Import', { timeout: 60000 }).should('be.visible').click()
      cy.contains('button:visible', '+ Add Domain Prompt', { timeout: 60000 }).should('be.visible').click()
    cy.get('div.fixed.inset-0.z-50.flex.flex-col', { timeout: 60000 }).should('be.visible').and('contain.text', 'Prompt Manager')
     cy.get('div.fixed.inset-0.z-50.flex.flex-col', { timeout: 60000 }).find('button.flex-1.text-left.text-sm', { timeout: 60000 }).should('have.length.greaterThan', 1)
     cy.contains('button:visible', ' New section', { timeout: 60000 }).should('be.visible').click()
     cy.wait(5000)
     cy.get('div.flex.flex-1.flex-col.gap-3.min-w-0.min-h-0.overflow-hidden', { timeout: 60000 }).should('be.visible')
     cy.get('input[placeholder="Label (e.g. Warehousing Domain)"]', { timeout: 60000 }).should('be.visible').and('not.have.value', '')
     cy.contains('button:visible', ' Create section', { timeout: 60000 }).should('be.visible').and('not.be.disabled').click()
     cy.wait(5000)
     cy.get('div.fixed.inset-0.z-50.flex.flex-col', { timeout: 60000 }).should('be.visible').and('contain.text', 'Prompt Manager')
     cy.get('div.fixed.inset-0.z-50.flex.flex-col', { timeout: 60000 }).find('button.flex-1.text-left.text-sm', { timeout: 60000 }).should('have.length.greaterThan', 1)
     cy.get('div.fixed.inset-0.z-50.flex.flex-col', { timeout: 60000 }).contains('button:visible', /^Back$/, { timeout: 60000 }).should('be.visible').click()
      cy.get('main', { timeout: 60000 }).should('be.visible')
      cy.get('[data-dashboard-export-root]').should('not.exist')
      cy.get('main').should('contain.text', `Schema: ${schemaName}`)
      cy.contains('button[role="tab"]', 'Dashboard', { timeout: 60000 }).should('be.visible').click()
      cy.contains('button[role="tab"]', 'Dashboard', { timeout: 60000 }).should('have.attr', 'aria-selected', 'true')
      cy.get('[data-dashboard-export-root]', { timeout: 60000 }).should('be.visible')
      openNewDashboard()
      cy.get('input[placeholder="Dashboard name"]', { timeout: 60000 }).should('be.visible').and('have.value', '').type('vehiclenew dashbord').and('have.value', 'vehiclenew dashbord')
      cy.get('input[placeholder="Dashboard name"]', { timeout: 60000 }).type('{enter}')
      cy.get('input[placeholder="Dashboard name"]', { timeout: 60000 }).should('not.exist')
      cy.get('button.breadcrumb-switcher', { timeout: 60000 }).should('contain.text', 'vehiclenew dashbord')
      cy.wait(5000)
      cy.get('button[class*="right-0"][class*="p-button-icon-only"]', { timeout: 60000 }).should('be.visible').click()
      cy.get('.p-sidebar-content', { timeout: 60000 }).should('be.visible')
      cy.get('[data-dashboard-export-root]', { timeout: 60000 }).should('contain.text', 'No charts yet')

      let sidebarBaseline = 0

      const requestChart = (attempt) => {
        cy.get('.p-sidebar-content', { timeout: 60000 }).then(($side) => {
          sidebarBaseline = $side.text().length
        })

        cy.get('input[placeholder="Describe a chart..."]', { timeout: 60000 }).should('be.visible').then(($input) => {
          const chartPrompt = `create a pie chart that shows the distribution of vehicles by make from table ${schemaName}.${tableName}. Use make as the grouping/category field and count vehicle_id as the metric, so each pie slice represents the number of vehicles for a particular make. The dataset represents vehicle information including make, model, year, body type, fuel type, transmission, drivetrain, engine specifications, mileage, price, and status. Use only the exact column names and this table, and do not use any other table. Avoid high-cardinality fields such as vehicle_id or model for pie-chart grouping; make, body_type, fuel_type, transmission, drivetrain, and status are more suitable categorical groupings. Group by make and count vehicle_id. Title the chart "Vehicle Distribution by Make".`

          cy.wrap($input).type(chartPrompt, { parseSpecialCharSequences: false })
          cy.get('input[placeholder="Describe a chart..."]', { timeout: 60000 }).should('have.value', chartPrompt)
          cy.get('.p-sidebar-content button.p-button-icon-only', { timeout: 60000 }).should('be.visible').and('not.be.disabled').click()
        })

        cy.get('.p-sidebar-content', { timeout: 180000 }).should(($side) => {
          const reply = $side.text().slice(sidebarBaseline)
          const created = /is now on the dashboard|chart created/i.test(reply)
          const failed = /did not complete|row is full|not classified/i.test(reply)
          expect(created || failed, 'chart request finished').to.be.true
        }).then(($side) => {
          const reply = $side.text().slice(sidebarBaseline)

          if (/is now on the dashboard|chart created/i.test(reply)) {
            cy.get('input[placeholder="Describe a chart..."]', { timeout: 60000 }).should('have.value', '')
            return
          }

          if (attempt >= 2) {
            throw new Error('Chart creation failed after retries: ' + reply.slice(-300))
          }

          cy.log(`chart creation attempt ${attempt + 1} failed, retrying`)
          cy.wait(3000)
          requestChart(attempt + 1)
        })
      }

      requestChart(0)

      cy.get('[data-dashboard-export-root]', { timeout: 180000 }).should(($root) => {
        const text = $root.text()
        expect(text, 'dashboard is no longer empty').to.not.contain('No charts yet')
        expect(text, 'a pie chart widget is rendered').to.match(/pie|doughnut/i)
      })
      cy.log('Pie chart rendered on the dashboard')
    
    })
    
    

})