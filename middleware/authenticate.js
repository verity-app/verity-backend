// backend/middleware/authenticate.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Le token doit être envoyé dans l'en-tête Authorization sous la forme "Bearer <token>"
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Accès non autorisé : aucun token fourni" });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé : token invalide" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Ajoutez l'ID de l'utilisateur à la requête pour utilisation ultérieure
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Accès non autorisé : token invalide" });
  }
};
