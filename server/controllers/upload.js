const uploadRouter = require('express').Router()
const middleware = require('../utils/middleware')
const { uploadPhoto, uploadToCloudinary } = require('../utils/image_upload')

uploadRouter.post('/', middleware.userExtractor, uploadPhoto.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' })
  }

  const result = await uploadToCloudinary(req.file.buffer)
  res.status(201).json({ imageUrl: result.secure_url })
})

module.exports = uploadRouter
