import mongoose from "mongoose"
import users from '../models/auth.js'

export const getallusers = async (req, res) => {
    try {
        const allusers = await users.find()
        const alluserdetails = [];
        allusers.forEach((user) => {
            alluserdetails.push({
              _id: user._id,
              name: user.name,
              about: user.about,
              tags: user.tags,
              joinedon: user.joinedon,
              profileImage: user.profileImage,  // ✅ Include this
            })
          })
      
        res.status(200).json(alluserdetails)
    } catch (error) {
        res.status(404).json({message:error.message})
        return
    }
}
export const updateprofile = async (req, res) => {
    const { id: _id } = req.params
    const { name, about, tags } = req.body
  
    let parsedTags = []
    try {
      parsedTags = JSON.parse(tags)
    } catch (err) {
      return res.status(400).json({ message: 'Invalid tags format. Must be an array.' })
    }
  
    const profileImage = req.file ? req.file.path : null
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("User unavailable")
    }
  
    try {
      const updateData = {
        name,
        about,
        tags: parsedTags,
      }
  
      if (profileImage) {
        updateData.profileImage = profileImage
      }
  
      const updatedUser = await users.findByIdAndUpdate(
        _id,
        { $set: updateData },
        { new: true }
      )
  
      res.status(200).json(updatedUser)
    } catch (error) {
      console.error("Error in updateprofile:", error)
      res.status(500).json({ message: error.message })
    }
  }
  
    