
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
  it('Verify user can open the Database tab and access the Add Schema dialog create animal schema',()=>{
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
    cy.get('input[placeholder="Schema name"]').type('animal-house1')
    cy.get('input[placeholder="e.g. 2 for FlexiPrint, 3 for Shipment — leave blank for Unassigned"]').type('5')
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

    cy.get('button.w-full.text-left', { timeout: 60000 }).should('have.length.greaterThan', 1).eq(1).should('not.be.empty').then(($schemaBtn) => {
        const schemaName = $schemaBtn.text().trim().replace(/^[^\p{L}\p{N}_]+/u, '').trim()
        expect(schemaName, 'schema name').to.not.be.empty
        $schemaBtn.click()
        cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', `Schema: ${schemaName}`) })
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

    cy.get('button.w-full.text-left', { timeout: 60000 }).should('have.length.greaterThan', 1).eq(1).should('not.be.empty').then(($schemaBtn) => {
        const schemaName = $schemaBtn.text().trim().replace(/^[^\p{L}\p{N}_]+/u, '').trim()
        expect(schemaName, 'schema name').to.not.be.empty
        $schemaBtn.click()
        cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', `Schema: ${schemaName}`) })
     cy.wait(5000)
    })
    it('Verify user can select a database schema and open the Add Table dialog ',()=>{

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

    cy.get('button.w-full.text-left', { timeout: 60000 }).should('have.length.greaterThan', 1).eq(1).should('not.be.empty').then(($schemaBtn) => {
        const schemaName = $schemaBtn.text().trim().replace(/^[^\p{L}\p{N}_]+/u, '').trim()
        expect(schemaName, 'schema name').to.not.be.empty
        $schemaBtn.click()
    cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', `Schema: ${schemaName}`) })
    cy.wait(5000)
    cy.contains('button[class="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"]', '+ Table').click() 
    cy.get('div.shadow-2xl ').should('be.visible')
    cy.wait(5000)
    })
  

     it('Verify user can select a database schema and open the Create Table dialog with enter input filled ',()=>{

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

    cy.get('button.w-full.text-left', { timeout: 60000 }).should('have.length.greaterThan', 1).eq(1).should('not.be.empty').then(($schemaBtn) => {
        const schemaName = $schemaBtn.text().trim().replace(/^[^\p{L}\p{N}_]+/u, '').trim()
        expect(schemaName, 'schema name').to.not.be.empty
        $schemaBtn.click()
    cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', `Schema: ${schemaName}`) })
    cy.contains('button[class="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"]', '+ Table').click() 
    cy.get('div.shadow-2xl ', { timeout: 60000 }).should('be.visible').and('contain.text', 'Create Table')
    cy.get('div.shadow-2xl input[placeholder="table_name"]', { timeout: 60000 }).should('be.visible').type('animal-table1')
    cy.get('div.shadow-2xl input[placeholder="column_name"]').should('be.visible').type('uniq animal')
    cy.wait(5000)
    })
    it('Verify user can create a new database table with a unique animal and dispaly details',()=>{
    const tableName = `animal_table_${Date.now()}`

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

    cy.get('button.w-full.text-left', { timeout: 60000 }).should('have.length.greaterThan', 1).eq(1).should('not.be.empty').then(($schemaBtn) => {
        const schemaName = $schemaBtn.text().trim().replace(/^[^\p{L}\p{N}_]+/u, '').trim()
        expect(schemaName, 'schema name').to.not.be.empty
        $schemaBtn.click()
    cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', `Schema: ${schemaName}`) })
    cy.contains('button[class="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"]', '+ Table').click() 
    cy.get('div.shadow-2xl ', { timeout: 60000 }).should('be.visible').and('contain.text', 'Create Table')
    cy.get('div.shadow-2xl input[placeholder="table_name"]', { timeout: 60000 }).should('be.visible').type(tableName)
    cy.get('div.shadow-2xl input[placeholder="column_name"]').should('be.visible').type('world unique animal')
    cy.contains('div.shadow-2xl button', 'Confirm').click()
    cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', tableName)
    cy.contains('button[class ="hover:underline"]', 'animal') 
    cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible')
    cy.wait(5000)
    })

    it('Verify Navigation Back to Schema Page After Clicking the Animal Table',()=>{
     const tableName = `animal_table_${Date.now()}`

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

    cy.get('button.w-full.text-left', { timeout: 60000 }).should('have.length.greaterThan', 1).eq(1).should('not.be.empty').then(($schemaBtn) => {
        const schemaName = $schemaBtn.text().trim().replace(/^[^\p{L}\p{N}_]+/u, '').trim()
        expect(schemaName, 'schema name').to.not.be.empty
        $schemaBtn.click()
    cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', `Schema: ${schemaName}`) })
    cy.contains('button[class="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"]', '+ Table').click() 
    cy.get('div.shadow-2xl ', { timeout: 60000 }).should('be.visible').and('contain.text', 'Create Table')
    cy.get('div.shadow-2xl input[placeholder="table_name"]', { timeout: 60000 }).should('be.visible').type(tableName)
    cy.get('div.shadow-2xl input[placeholder="column_name"]').should('be.visible').type('world unique animal')
    cy.contains('div.shadow-2xl button', 'Confirm').click()
    cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', tableName)
    cy.contains('button[class ="hover:underline"]', 'animal') 
    cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible')
    cy.contains('button[class ="hover:underline"]', 'animal').click()
    cy.wait(5000)
  
    
     })
    it('Verify Table Creation and Deletion in the Animal Schema',()=>{
     const tableName = `animal_table_${Date.now()}`

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
    cy.get('button.w-full.text-left', { timeout: 60000 }).should('have.length.greaterThan', 1).eq(1).click()
    cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', 'Schema: animal')
    cy.contains('button[class="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"]', '+ Table').click() 
    cy.get('div.shadow-2xl ', { timeout: 60000 }).should('be.visible').and('contain.text', 'Create Table')
    cy.get('div.shadow-2xl input[placeholder="table_name"]', { timeout: 60000 }).should('be.visible').type(tableName)
    cy.get('div.shadow-2xl input[placeholder="column_name"]').should('be.visible').type('world unique animal')
    cy.contains('div.shadow-2xl button', 'Confirm').click()
    cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', tableName)
    cy.contains('button[class="text-xs px-3 py-1.5 rounded-lg"]','Delete Table').click()
    cy.get('div.rounded-2xl.shadow-2xl', { timeout: 60000 }).should('be.visible').and('contain.text', 'Drop Table')
    cy.get('div.rounded-2xl.shadow-2xl input').should('be.visible').type(`DROP animal.${tableName}`)
    cy.contains('div.rounded-2xl.shadow-2xl button', 'Confirm').click()
    cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('not.contain.text', tableName)
    cy.wait(5000)

   })
  
    it('Verify Table Creation and rename in the Animal Schema',()=>{
     const tableName = `animal_table_${Date.now()}`

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
    cy.get('button.w-full.text-left', { timeout: 60000 }).should('have.length.greaterThan', 1).eq(1).click()
    cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', 'Schema: animal')
    cy.contains('button[class="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"]', '+ Table').click() 
    cy.get('div.shadow-2xl ', { timeout: 60000 }).should('be.visible').and('contain.text', 'Create Table')
    cy.get('div.shadow-2xl input[placeholder="table_name"]', { timeout: 60000 }).should('be.visible').type(tableName)
    cy.get('div.shadow-2xl input[placeholder="column_name"]').should('be.visible').type('world unique animal')
    cy.contains('div.shadow-2xl button', 'Confirm').click()
     cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', tableName)
     const renamedTable = 'animal_table_1658gvulR3456'
     cy.contains('button[class="text-xs px-3 py-1.5 rounded-lg"]', 'Rename Table').click()
     cy.get('div.rounded-2xl.shadow-2xl', { timeout: 60000 }).should('be.visible').and('contain.text', 'Rename Table')
     cy.get('div.rounded-2xl.shadow-2xl input[type="text"]', { timeout: 60000 }).should('be.visible').clear().type(renamedTable)
     cy.contains('div.rounded-2xl.shadow-2xl button', 'Confirm').should('not.be.disabled').click()
     cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('not.contain.text', tableName).and('contain.text', renamedTable)
     cy.wait(5000)
    })
    
   
    it('Verify Table Creation and Column Addition in Database',()=>{
     const tableName = `animal_table_${Date.now()}`

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

    cy.get('button.w-full.text-left', { timeout: 60000 }).should('have.length.greaterThan', 1).eq(1).should('not.be.empty').then(($schemaBtn) => {
        const schemaName = $schemaBtn.text().trim().replace(/^[^\p{L}\p{N}_]+/u, '').trim()
        expect(schemaName, 'schema name').to.not.be.empty
        $schemaBtn.click()
    cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', `Schema: ${schemaName}`) })
    cy.contains('button[class="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"]', '+ Table').click() 
    cy.get('div.shadow-2xl ', { timeout: 60000 }).should('be.visible').and('contain.text', 'Create Table')
    cy.get('div.shadow-2xl input[placeholder="table_name"]', { timeout: 60000 }).should('be.visible').type(tableName)
    cy.get('div.shadow-2xl input[placeholder="column_name"]').should('be.visible').type('world unique animal')
    cy.contains('div.shadow-2xl button', 'Confirm').click()
    cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', tableName)
    cy.contains('button[class="text-xs font-medium px-3 py-1.5 rounded-lg"]','+ Column').click()
    cy.get('div.rounded-2xl.shadow-2xl',{timeout:60000}).should('be.visible').and('contain.text','Add Column')
    cy.get('div.rounded-2xl.shadow-2xl input[placeholder="column_name"]').should('be.visible').type('Scientific Name')
    cy.get('div.rounded-2xl.shadow-2xl select').should('be.visible').select('VARCHAR').should('have.value', 'VARCHAR')
    cy.get('div.rounded-2xl.shadow-2xl input[type="checkbox"]').eq(1).should('be.visible').check({ force: true })
    cy.contains('div.rounded-2xl.shadow-2xl button', 'Confirm').should('not.be.disabled').click()
    cy.get('div.flex.flex-1.flex-col.overflow-hidden', { timeout: 60000 }).should('be.visible').and('contain.text', 'scientific_name')
    
    
    })

 })
   

    
   

  