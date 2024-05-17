const pool = require("./connect.js");


async function guardarContacto(io, message) {
    if (message.type === "chat") {
        try {
            const { from, author } = message
            const pushname = message._data.notifyName
            const result = await pool.query("INSERT INTO contactos(numero, name, pushname) SELECT ?, ?, ? FROM dual WHERE NOT EXISTS (SELECT * FROM contactos WHERE numero = ?)", [from, author, pushname, from]);
            if (result[0].affectedRows > 0) {
                const contact = {
                    numero: from,
                    name: author,
                    pushname
                }
                io.emit("contact", contact);
                console.log("se agrego contacto");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

async function guardarMesage(io, message) {
    if (message.type === "chat") {
        try {
            const { from, to, body, fromMe } = message
            await pool.query("INSERT INTO mensajes(numeroFrom, numeroTo, contenido, send) VALUES (?, ?, ?, ?)", [from, to, body, fromMe]);
            const newMessage = {
                numeroFrom: from,
                numeroTo: to,
                contenido: body,
                send: fromMe
            }
            io.emit("message", newMessage);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { guardarContacto, guardarMesage }