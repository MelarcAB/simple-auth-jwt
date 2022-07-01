const { json } = require('body-parser')

const router = require('express').Router()

router.get("/", (req, res) => {

    res.json({
        error: null,
        data: {
            titulo: "pagina protegida per als que no han fet login",
            user: req.user
        }
    })
})

module.exports = router
