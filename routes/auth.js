const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');



//bcrypt para encriptar la password
const bcrypt = require('bcrypt');

//Joi para validaciones
const Joi = require('@hapi/joi');
//esquemas para las validaciones
const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    surname: Joi.string().min(6).max(255),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})






//post registrar new user
router.post('/register', async (req, res) => {
    //validación de campos usando Joi
    const { error } = schemaRegister.validate(req.body)
    if (error) {
        return res.status(400).json(
            { error: error.details[0].message }
        )
    }
    //validación email no repetido
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            { error: 'Email ya registrado' }
        )
    }

    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    //Construir objeto user
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: password
    });


    //respuesta
    try {
        const savedUser = await user.save();
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({ error })
    }
})


router.post('/login', async (req, res) => {
    //validacion campos
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ error: "El usuario no existe" })

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).json({ error: "La contraseña no es válida" })


    // crear token jwt
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).json({
        error: null,
        data: { token }
    })
    /*
        res.json({
            error: null,
            data: "login ok"
        })
    */
})




module.exports = router;
