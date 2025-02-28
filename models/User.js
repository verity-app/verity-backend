// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Nouveaux champs pour le profil complet :
  phone: { type: String },
  bio: { type: String },
  profilePicture: { type: String }, // URL de la photo de profil
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
