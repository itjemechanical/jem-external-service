const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        } else {
            req.subcontractor = decodedToken.subcontractor;
            req.user = decodedToken.user;
            
        }
    });

    next();
}


module.exports = authenticateJWT;