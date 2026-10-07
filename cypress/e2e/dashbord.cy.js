const SHIPMENT_ORG_COMMENTS_ICON =
  'span[data-pc-section="icon"].pi-comments, span[data-pc-section="icon"] .pi-comments'

const AI_ASSISTANT_SIDEBAR = '[role="complementary"][data-pc-name="sidebar"]'
const AI_ASSISTANT_PROMPT = 'input[placeholder="Describe a chart..."]'

const AI_ASSISTANT_SEND_ICON = `${AI_ASSISTANT_SIDEBAR} span[data-pc-section="icon"].pi-send`

const selectShipmentOrg = () => {
  cy.intercept('GET', '**/api/dashboards?orgId=5').as('LLFDashboarFds')

  cy.get('select[aria-label="Organization scope"]:visible', { timeout: 150000 }).should('have.value', '0').select('5').should('have.value', '5')
  cy.get('select[aria-label="Organization scope"]:visible option:selected', { timeout: 150000 }).should('contain.text', 'LLF')
  cy.wait('@LLFDashboarFds').its('response.body.0.title').should('be.a', 'string').then((title) => {
    cy.get('button[aria-label^="Switch dashboard: LLF - Leather Usage Analysis"]', { timeout: 150000 }).should('contain.text', title)
  })
  cy.get('div[data-dashboard-export-root]', { timeout: 150000 }).should('be.visible').and('not.be.empty')
}

describe('Verify Shipment Organization Dashboard and AI Assistant Workflow', () => {

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

  it('Verify that the Shipment dropdown allows users to select an organization', () => {
     cy.get('button[aria-haspopup="menu"][aria-label^="Switch dashboard"]', { timeout: 30000 }).should('be.visible').and('have.attr', 'aria-expanded', 'false').click()
     cy.get('div[role="menu"][aria-label="Switch dashboard"] [role="menuitem"]', { timeout: 30000 }).should('have.length.greaterThan', 0)
     cy.contains('div[role="menu"][aria-label="Switch dashboard"] [role="menuitem"]', 'Shipment-Test2').click()
     cy.get('button[aria-label^="Switch dashboard"]', { timeout: 30000 }).should('be.visible').and('contain.text', 'Shipment-Test2').and('have.attr', 'title', 'Shipment-Test2')
     cy.get('div[data-dashboard-export-root]', { timeout: 30000 }).should('be.visible').and('not.be.empty')
      cy.wait(5000)
  })

  it('should show correct results when FlexiPrint is selected', () => {
    cy.intercept('GET', '**/api/dashboards?orgId=2').as('flexiPrintDashboards')

    cy.get('select[aria-label="Organization scope"]:visible', { timeout: 30000 }).should('have.value', '0').select('2').should('have.value', '2').and('contain.text', 'FlexiPrint')
    cy.wait('@flexiPrintDashboards').its('response.body.0.title').should('be.a', 'string').then((title) => {
      cy.get('button[aria-label^="Switch dashboard"]', { timeout: 30000 }).should('contain.text', title)
    })
    cy.get('div[data-dashboard-export-root]', { timeout: 30000 }).should('be.visible').and('not.be.empty')
    cy.wait(5000)
  })
  it('should show correct results when Shipment is selected', () => {
    cy.intercept('GET', '**/api/dashboards?orgId=5').as('LLFDashboarFds')

    cy.get('select[aria-label="Organization scope"]:visible', { timeout: 150000 }).should('have.value', '0').select('5').should('have.value', '5')
    cy.get('select[aria-label="Organization scope"]:visible option:selected', { timeout: 150000 }).should('contain.text', 'LLF')
    cy.wait('@LLFDashboarFds').its('response.body.0.title').should('be.a', 'string').then((title) => {
      cy.get('button[aria-label^="Switch dashboard: LLF - Leather Usage Analysis"]', { timeout: 150000 }).should('contain.text', title)
    })
    cy.get('div[data-dashboard-export-root]', { timeout: 150000 }).should('be.visible').and('not.be.empty')
     cy.wait(5000)
  })
  it('should open the AI assistant panel when Shipment is selected', () => {
    selectShipmentOrg()

    cy.get('div[data-dashboard-export-root]', { timeout: 150000 }).contains('h3', 'Top 20 Leathers by Total Price').should('be.visible')

    cy.get(SHIPMENT_ORG_COMMENTS_ICON, { timeout: 150000 }).should('be.visible')
    cy.clickStable(SHIPMENT_ORG_COMMENTS_ICON, { timeout: 60000 })

    cy.get('[role="complementary"][data-pc-name="sidebar"]', { timeout: 150000 }).should('be.visible').and('contain.text', 'AI Assistant')
    cy.wait(5000)
  })
   it('should open the AI assistant panel when Shipment is selected type crete chart', () => {
    selectShipmentOrg()

    cy.get('div[data-dashboard-export-root]', { timeout: 150000 }).contains('h3', 'Top 20 Leathers by Total Price').should('be.visible')

    cy.get(SHIPMENT_ORG_COMMENTS_ICON, { timeout: 150000 }).should('be.visible')
    cy.clickStable(SHIPMENT_ORG_COMMENTS_ICON, { timeout: 60000 })

    cy.get(AI_ASSISTANT_SIDEBAR, { timeout: 150000 }).should('be.visible').and('contain.text', 'AI Assistant')
    cy.get(AI_ASSISTANT_PROMPT).should('be.visible').type('Create a doughnut chart showing the breakdown of production runs by quality check result.')
    cy.get(AI_ASSISTANT_SEND_ICON, { timeout: 60000 }).should('be.visible')
    cy.clickStable(AI_ASSISTANT_SEND_ICON, { timeout: 60000 })
  })
  
})
