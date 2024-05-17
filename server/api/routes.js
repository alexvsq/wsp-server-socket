const { getUsers, getOneUser, getMessages, sendMessage } = require("./controllers.js")

const { Router } = require("express")

const router = Router()

router.get("/wsp", getUsers)
router.get("/wsp/user/:number", getOneUser)
router.get("/wsp/:number", getMessages)


module.exports = router;