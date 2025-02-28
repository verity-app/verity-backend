// backend/routes/profile.js
const express = require('express');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate'); // Ce middleware doit extraire userId depuis le token

const router = express.Router();

// Route GET pour obtenir le profil de l'utilisateur connecté
// Accessible via : GET /api/profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // Exclure le mot de passe
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json({ user });
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route PUT pour mettre à jour le profil
// Accessible via : PUT /api/profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, phone, bio, profilePicture } = req.body;

    // Vous pouvez ajouter ici des validations spécifiques (format téléphone, etc.)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone, bio, profilePicture },
      { new: true, runValidators: true }
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
        phone: updatedUser.phone,
        bio: updatedUser.bio,
        profilePicture: updatedUser.profilePicture,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
