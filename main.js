const http = require('http');

const PORT = 3000;


const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    console.log(`Получен запрос: ${req.method} ${req.url}`);

    res.end('Hello!');
});

server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});