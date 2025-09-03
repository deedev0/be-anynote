import { matchedData } from 'express-validator';
import { comparePassword, hashPassword } from '../utils/helpers.mjs';
import { User } from '../mongoose/schemas/user.mjs';
import { deleteImage } from '../utils/helpers.mjs';
import path from 'path';

const createUser = async (req, res) => {
  const data = matchedData(req);
  data.password = hashPassword(data.password);
  data.image = req.file?.filename || null;

  const newUser = new User(data);
  try {
    const savedUser = await newUser.save();
    return res.status(201).send(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      deleteImage(req.file.path);
      return res.status(400).json({ error: "Username is not available" });
    }

    console.log(error);
    return res.sendStatus(400);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: 'failed to fetch data' });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return res.status(404).send({ message: 'User not found'});

    return res.send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message});
  }
};

const updateUser = async (req, res) => {
  try {
    const data = matchedData(req);
    const { id } = req.params;
    const updateData = {};
    const user = await User.findById(id).select('+password');

    if (data.password && data.newPassword) {
      if (!user) return res.status(404).send({ message: 'User not found!.'});

      console.log(data.password, user.password);
      
      comparePassword(data.password, user.password) ? updateData.password = hashPassword(data.newPassword) : res.status(400).send({ message: 'Failed Update, Wrong Password Try Again.'});
    } else if (data.password || data.newPassword) {
      return res.status(400).send({ message: 'Failed Update, Password and newPassword are both required!'});
    }
    
    if (data.fullName) updateData.fullName = data.fullName;
    if (req.file) {
      updateData.image = req.file.filename;

      if (user.image) {
        const filePath = path.join(process.cwd(), "src", "uploads", user.image);
        deleteImage(filePath);
      }
    }
    
    const userUpdate = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    
    if (!userUpdate) return res.status(404).send({ message: 'User not found!.'});

    return res.status(200).send({ message: 'Successfully updated', data: userUpdate});
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: error.message});
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).send({ message: 'User not found!'})

    return res.send({ message: 'Successfully deleted', user: user.id });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

export { createUser, getAllUsers, getUser, updateUser, deleteUser };
