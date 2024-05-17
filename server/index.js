const express = require("express");
const cors = require("cors");
const pool = require("./db/connect.js")
const { guardarContacto, guardarMesage } = require("./db/saveFunctions.js")

const router = require("./api/routes.js")
const http = require('http');
const { Server } = require('socket.io');

const { auth } = require("./wsp-server/index.js");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

const client = auth();

/* client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
}); */

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message_create', async (message) => {
    await guardarContacto(io, message)
    await guardarMesage(io, message)
});

try {
    client.initialize();
} catch (error) {
    console.error('Error initializing client:', error);
}

app.use(express.json());
app.use(cors())
app.use(router)

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("message", async (text) => {
        if (text.type !== "chat") {
            try {
                const { numeroFrom, numeroTo, contenido, send } = text
                await pool.query("INSERT INTO mensajes(numeroFrom, numeroTo, contenido, send) VALUES (?,?,?,?)", [numeroFrom, numeroTo, contenido, send]);
                console.log(text);
                //send message wsp
                client.sendMessage(numeroTo, contenido);
            } catch (error) {
                console.log(error);
            }
        }

    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = { io };