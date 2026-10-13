const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 15000,
  pageLoadTimeout: 120000,
  expose: {
    // Public (non-sensitive). Set the emailed verification link here or pass
    // it at run time with `cypress run -x VERIFICATION_LINK=<url>`.
    VERIFICATION_LINK: "",
  },
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === "chromium") {
          launchOptions.args.push(
            "--host-resolver-rules=MAP static.cloudflareinsights.com 127.0.0.1:1",
          );
        }
        return launchOptions;
      });
    },
  },
});
