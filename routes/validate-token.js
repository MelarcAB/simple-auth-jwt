const jwt = require('jsonwebtoken')


//middleware para verificar el token y proteger rutas
const verificarToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).json({ error: "Acceso no permitido" })
    }
    try {
        const verificado = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verificado
        next()
    } catch (error) {
        res.status(400).json({ error: 'token no es válido' })

    }
}


module.exports = verificarToken;
