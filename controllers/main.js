const BadRequestError = require('../errors');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    //Check username and password
    const { username, password } = req.body

    //Validate username and password
    //1 mongoose validation || 2 Joi package || 3 check in the controller 
    if (!username || !password) {
        throw new BadRequestError('Please provide username and password')
    }

    //Create a new JT
    //ID es creada como demo, normalmente es un valor de DB
    const id = new Date().getDate()
    //.sing requiere Payload(string u objeto, nunca password, generalmente pequeño), SecretKey and Options.
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })
    res.status(200).json({ msg: 'User created', token })
};

const dashboard = async (req, res) => {

    const luckyNumber = Math.floor(Math.random() * 100)     //Número generado aleatoreamente

    res
        .status(200)
        .json({ msg: `Hello ${req.user.username}`, secret: `Here is your lucky number: ${luckyNumber}` })
};

module.exports = { login, dashboard }