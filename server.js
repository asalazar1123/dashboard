import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const port = 5500;

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;

  if (filePath === './') {
    filePath = './index.html';
  }

  if (filePath === './app.js') {
    filePath = './JS/app.js';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css'
  }[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data, 'utf-8');
  });
});

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
