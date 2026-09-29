// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

const STABILITY_POLL_INTERVAL = 200

const isRendered = (element) => {
  const style = element.ownerDocument.defaultView.getComputedStyle(element)
  const rect = element.getBoundingClientRect()

  return (
    element.isConnected &&
    style.visibility !== 'hidden' &&
    style.display !== 'none' &&
    rect.width > 0 &&
    rect.height > 0
  )
}

const sameRect = (first, second) =>
  Boolean(
    first &&
      second &&
      first.top === second.top &&
      first.left === second.left &&
      first.width === second.width &&
      first.height === second.height,
  )

const isInViewport = (element) => {
  const rect = element.getBoundingClientRect()
  const { innerWidth, innerHeight } = element.ownerDocument.defaultView

  return rect.top < innerHeight && rect.bottom > 0 && rect.left < innerWidth && rect.right > 0
}

// Clicks an element only once the app has stopped re-rendering it.
//
// The dashboard mounts its widgets asynchronously, so a node found by the
// selector can be replaced before Cypress finishes its actionability check,
// which aborts with "element has detached from the DOM". `cy.click()` never
// retries after a detachment, so this command re-queries on every poll and
// dispatches the click itself once the element has held the exact same
// position for `stableSamples` consecutive polls.
Cypress.Commands.add(
  'clickStable',
  (selector, { timeout = 30000, interval = STABILITY_POLL_INTERVAL, stableSamples = 3 } = {}) => {
    const startedAt = Date.now()

    cy.log(`clickStable: waiting for "${selector}" to settle`)

    cy.window().then({ timeout: timeout + 5000 }, (win) => {
      const attempt = (samples = 0, previousRect = null) => {
        const elapsed = Date.now() - startedAt

        if (elapsed > timeout) {
          throw new Error(`Timed out after ${elapsed}ms waiting for "${selector}" to stop re-rendering`)
        }

        const candidate = win.document.querySelector(selector)

        if (!candidate || !isRendered(candidate)) {
          return Cypress.Promise.delay(interval).then(() => attempt(0, null))
        }

        if (!isInViewport(candidate)) {
          candidate.scrollIntoView({ block: 'center', inline: 'nearest' })
          return Cypress.Promise.delay(interval).then(() => attempt(0, null))
        }

        const rect = candidate.getBoundingClientRect()

        if (!sameRect(rect, previousRect)) {
          return Cypress.Promise.delay(interval).then(() => attempt(1, rect))
        }

        if (samples + 1 < stableSamples) {
          return Cypress.Promise.delay(interval).then(() => attempt(samples + 1, rect))
        }

        const target = candidate.closest('button') || candidate

        target.click()

        return null
      }

      return attempt()
    })
  },
)
