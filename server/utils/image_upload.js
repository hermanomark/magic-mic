const cloudinary = require('cloudinary').v2
const multer = require('multer')
const sharp = require('sharp')
const config = require('../utils/config')

// Standard TCG card dimensions: 2.5" × 3.5" at 300 DPI → 750 × 1050 px
const TCG_WIDTH = 750
const TCG_HEIGHT = 1050

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
})

const uploadPhoto = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Not an image! Please upload an image only'))
    }
  },
})

const uploadToCloudinary = async (buffer) => {
  const resized = await sharp(buffer)
    .resize(TCG_WIDTH, TCG_HEIGHT, { fit: 'cover', position: 'centre' })
    .toBuffer()

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'magic-mic', resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      }
    )
    stream.end(resized)
  })
}

module.exports = {
  uploadPhoto,
  uploadToCloudinary
}