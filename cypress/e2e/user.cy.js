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
})