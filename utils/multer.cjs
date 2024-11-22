// utils/multer.cjs
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary.cjs');

// Configure multer to use Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profiles', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png'],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;