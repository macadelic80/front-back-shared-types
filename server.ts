import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'node:url';
import type {
    Player
} from './types';

const Players: Record<string, Player> = {
    "foo": {
        name: "foo",
        age: 20,
        country: "bar"
    },
    "bar": {
        name: "bar",
        age: 30,
        country: "baz"
    }
};

console.log(Players);
export const getDirname = (url: string) => {
    const __filename = fileURLToPath(url);
    return path.dirname(__filename);
};

const server = http.createServer((req, res) => {
    const __dirname = getDirname(import.meta.url);
    if (req.url === '/' || req.url === '/index.html') {
        const indexPath = path.join(__dirname, '..', 'client.html');
        fs.readFile(indexPath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        const filePath = path.join(__dirname, req.url!);
        console.log(filePath);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
    }
});
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});