const pool = require("../db/connect.js")
const io = require("../index.js")

const getUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM contactos")
        res.json(result[0])
    } catch (error) {
        console.log(error);
    }
}

const getOneUser = async (req, res) => {
    try {
        const number = req.params.number
        const result = await pool.query("SELECT * FROM contactos WHERE numero=?", number)
        res.json(result[0])
    } catch (error) {
        console.log(error);
    }
}

const getMessages = async (req, res) => {
    try {
        const number = req.params.number
        const result = await pool.query("SELECT * FROM mensajes WHERE numeroFrom=? OR numeroTo=?", [number, number])
        //const result = await pool.query("SELECT * FROM mensajes WHERE numeroTo=?", number)
        res.json(result[0])
    } catch (error) {
        console.log(error);
    }
}


module.exports = { getUsers, getOneUser, getMessages }