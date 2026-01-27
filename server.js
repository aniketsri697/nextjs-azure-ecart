const { createServer } = require("http");
const next = require("next");
const path = require("path");

const port = process.env.PORT || 8080;
const app = next({
  dev: false,
  conf: {
    distDir: ".next",
  },
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});
