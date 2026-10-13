describe('verify when user contioue with google account userorganize Schema and Table Management Workflow', () => {

  it('Verify the application homepage loads successfully', () => {
    cy.visit('https://dev.dashaibee.com/', { waitUntil: 'domcontentloaded' })
   cy.wait(5000)
})
it('Verify User Registration and Email Verification Workflow',()=>{

   const email = `minurasiyoth+test1@gmail.com`

   cy.visit('https://dev.dashaibee.com/', { waitUntil: 'domcontentloaded' })
   cy.contains('button','Sign up').click()
   cy.get('form.space-y-5').should('be.visible')
   cy.get('input[placeholder="Enter your full name"]').type('minursilva')
   cy.get('input[placeholder="Enter email"]').type(email)
   cy.get('input[placeholder="Enter password"]').type('minura1234#')
   cy.get('input[placeholder="Re-enter password"]').type('minura1234#')
   cy.contains('button','Create account').click()

   cy.contains('Check your email', { timeout: 30000 }).should('be.visible')
   cy.contains('button', 'Resend verification email').should('be.visible').click()

   
   const verificationLink = Cypress.expose('VERIFICATION_LINK')
   if (verificationLink) {
     cy.clickLinkInEmail(verificationLink, { subject: 'Verify your email address' })
   } else {
     cy.log('Skipped opening the verification link: set VERIFICATION_LINK to test it.')
   }
   cy.wait(15000)
 })
 it('Verify Sign In with Email and Password',()=>{

   cy.visit('https://dev.dashaibee.com/', { waitUntil: 'domcontentloaded' })
   cy.get('input[placeholder="Enter email"]').type('minurasiyoth+test1@gmail.com')
   cy.get('input[placeholder="Enter password"]').type('minura1234#')
   cy.contains('button', 'Sign In').click()

 })
  describe('Organization onboarding workflow', () => {
    beforeEach(() => {
      cy.visit('https://dev.dashaibee.com/login', { waitUntil: 'domcontentloaded' })
      cy.get('input[placeholder="Enter email"]').type('minurasiyoth+test1@gmail.com')
      cy.get('input[placeholder="Enter password"]').type('minura1234#')
      cy.get('button[type="submit"]').click()

      cy.window().should((win) => {
        expect(win.localStorage.getItem('token'), 'auth token').to.be.a('string')
      })

      cy.window().then((win) => {
        const user = JSON.parse(win.localStorage.getItem('user'))
        user.onboardingRequired = true
        win.localStorage.setItem('user', JSON.stringify(user))
        win.localStorage.removeItem('activeOrgId')
      })

      cy.visit('https://dev.dashaibee.com/', { waitUntil: 'domcontentloaded' })
    })

  it('Verify user can enter an organization name and continue', () => {

     cy.get('div[id="root"]').should('be.visible')
     cy.get('div.onb-card.mt-7.p-5',{timeout:60000}).should('be.visible')
     cy.get('label[for="onboarding-org-name"]',{timeout:60000}).should('be.visible').and('contain.text','Organization name')
     cy.get('input[placeholder="e.g. Acme Analytics"]').should('be.visible').type('vehiclehondacar')
     cy.wait(5000)
     cy.contains('button.onb-btn-primary','Continue').should('be.visible').click()
     cy.wait(5000)

  })
   it('Verify user can complete organization setup and continue with Free plan', () => {

     cy.get('div[id="root"]').should('be.visible')
     cy.get('div.onb-card.mt-7.p-5',{timeout:60000}).should('be.visible')
     cy.get('label[for="onboarding-org-name"]',{timeout:60000}).should('be.visible').and('contain.text','Organization name')
     cy.get('input[placeholder="e.g. Acme Analytics"]').should('be.visible').type('vehiclehondacar')
     cy.wait(5000)
     cy.contains('button.onb-btn-primary','Continue').should('be.visible').click()
     cy.wait(5000)
     cy.contains('button.onb-btn-primary','Continue with Free').should('be.visible').click()
     cy.get('div.w-full.flex.flex-col').should('be.visible')
     cy.wait(5000)
  })
     it('Verify user can add a teammate during organization onboarding', () => {

     cy.get('div[id="root"]').should('be.visible')
     cy.get('div.onb-card.mt-7.p-5',{timeout:60000}).should('be.visible')
     cy.get('label[for="onboarding-org-name"]',{timeout:60000}).should('be.visible').and('contain.text','Organization name')
     cy.get('input[placeholder="e.g. Acme Analytics"]').should('be.visible').type('vehiclehondacar')
     cy.wait(5000)
     cy.contains('button.onb-btn-primary','Continue').should('be.visible').click()
     cy.wait(5000)
     cy.contains('button.onb-btn-primary','Continue with Free').should('be.visible').click()
     cy.get('div.w-full.flex.flex-col').should('be.visible')
     cy.get('form[class="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3"]',{timeout:60000}).should('be.visible')
     cy.get('input[placeholder="Jane Doe"]').should('be.visible').type('testuser6')
    cy.get('input[placeholder="jane@company.com"]').should('be.visible').type('minurasiyoth+test1@gmail.com')
    cy.get('button.onb-input.onb-select-btn').should('be.visible').eq(0).click()
     cy.contains('button.onb-btn-add.w-full', 'Add teammate').should('be.visible').click()
     cy.wait(5000)
  })

  it('Verify user can add a teammate and create the workspace successfully', () => {

     cy.get('div[id="root"]').should('be.visible')
     cy.get('div.onb-card.mt-7.p-5',{timeout:60000}).should('be.visible')
     cy.get('label[for="onboarding-org-name"]',{timeout:60000}).should('be.visible').and('contain.text','Organization name')
     cy.get('input[placeholder="e.g. Acme Analytics"]').should('be.visible').type('carvan')
     cy.wait(5000)
     cy.contains('button.onb-btn-primary','Continue').should('be.visible').click()
     cy.wait(5000)
     cy.contains('button.onb-btn-primary','Continue with Free').should('be.visible').click()
     cy.get('div.w-full.flex.flex-col').should('be.visible')
     cy.get('form[class="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3"]',{timeout:60000}).should('be.visible')
     cy.get('input[placeholder="Jane Doe"]').should('be.visible').type('testuser2')
    cy.get('input[placeholder="jane@company.com"]').should('be.visible').type('chandrasiri33+test2@gmail.com')
    cy.get('button.onb-input.onb-select-btn').should('be.visible').eq(0).click()
     cy.contains('button.onb-btn-add.w-full', 'Add teammate').should('be.visible').click()
     cy.wait(5000)
     cy.contains('button.onb-btn-primary','Review 1 invite').should('be.visible').click()
     cy.wait(5000)
     cy.contains('button.onb-btn-primary','Confirm & create workspace').should('be.visible').click()

  })
  })
})