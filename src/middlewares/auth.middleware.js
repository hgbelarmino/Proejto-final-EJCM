const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            erro: "Token não fornecido."
        });
    }

    const partes = authHeader.split(" ");
    
    if (partes.length !== 2 || partes[0] !== "Bearer") {
        return res.status(401).json({
            erro: "Token inválido."
        });
    }

    const token = partes[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;

        return next();
    } catch (error) {
        return res.status(401).json({
            erro: "Token inválido ou não fornecido."
        });
    }
}

module.exports = authMiddleware;