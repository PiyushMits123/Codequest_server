import multer from 'multer'
import path from 'path'

// Create storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) // Unique filename
  }
})

// File filter (optional: accept only images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true)
  else cb(new Error('Only image files are allowed!'), false)
}

export const upload = multer({ storage, fileFilter })
