const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, ".local-host-dist");
const port = Number(process.env.PORT || 3000);

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

http
  .createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = decodeURIComponent(url.pathname);
    const requested = path.normalize(path.join(root, pathname));
    const insideRoot = requested === root || requested.startsWith(root + path.sep);
    const candidate = insideRoot && fs.existsSync(requested) && fs.statSync(requested).isFile()
      ? requested
      : path.join(root, "index.html");

    fs.readFile(candidate, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Server error");
        return;
      }

      res.writeHead(200, {
        "Content-Type": mime[path.extname(candidate).toLowerCase()] || "application/octet-stream",
      });
      res.end(data);
    });
  })
  .listen(port, "0.0.0.0", () => {
    console.log(`Local site running at http://localhost:${port}/`);
  });
