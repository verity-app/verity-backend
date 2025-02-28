// backend/routes/profile.js
const express = require('express');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Route pour mettre à jour le profil de l'utilisateur connecté
// Méthode PUT sur "/api/profile"
router.put('/profile', authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    // On récupère les champs à mettre à jour depuis le corps de la requête
    const { name, email } = req.body;

    // Vous pouvez ajouter ici des validations supplémentaires si nécessaire

    // Mise à jour de l'utilisateur dans la base de données
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true } // new: retourne le document mis à jour
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({
      message: "Profil mis à jour avec succès",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
