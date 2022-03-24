const mongoose = require('mongoose');

const userModel = mongoose.Schema(
  {
    name: { type: 'string', required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      required: true,
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    isAdmin: {
      type: 'boolean',
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userModel);

module.exports = User;
