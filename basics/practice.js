const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write('<body><form action="/create-user" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/users') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write('<body><ul><li>João</li><li>Maria</li></ul></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/create-user' && req.method === 'POST') {
    console.log('Posting');
    const body = [];
    req.on('data', (chunck) => {
      body.push(chunck);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      console.log(message);
    })
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

});

server.listen(3000);
