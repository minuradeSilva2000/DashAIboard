const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 15000,
  pageLoadTimeout: 120000,
  e2e: {
    setupNodeEvents(on, config) {
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
