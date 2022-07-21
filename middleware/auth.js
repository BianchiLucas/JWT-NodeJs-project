const { UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');


const authenticationMiddleware = (req, res, next) => {
    //Validar existencia del header autorization del Token
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided')
    }

    //Tomar la porción codificada del header
    const token = authHeader.split(' ')[1]

    //Decodificar. Verify requiere Token y SecretKey
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { id, username } = decoded
        req.user = { id, username }     //Set the user property
        next()

    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }
};

module.exports = authenticationMiddleware;