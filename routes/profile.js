// backend/routes/profile.js
const express = require('express');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Route PUT pour mettre à jour le profil de l'utilisateur connecté
// Accessible via: PUT /api/profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    // Récupération des données à mettre à jour
    const { name, email, phone, bio, profilePicture } = req.body;

    // Vous pouvez ajouter des validations spécifiques ici (ex: format de téléphone)

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
