import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import {createAccessToken} from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'


export const register = async (req, res) => {
    const {cedula, username, email, password} = req.body

    try {

        const userFound = await User.findOne({email})

        if( userFound ) return res.status(400).json(["The email already exists"]);

        const passwordHash = await bcrypt.hash(password, 5) 

        const newUser = new User({
            cedula, 
            username,
            email,
            password: passwordHash
        })
        const userSaved = await newUser.save();
        const token = await createAccessToken({id: userSaved._id})

        res.cookie("token", token)

        res.json({
            id: userSaved._id,
            cedula: userSaved.cedula,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,

        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const login = async (req, res) => {
    const {cedula, password} = req.body

    try {
        const userFound = await User.findOne({cedula});

        if(!userFound) return res.status(400).json({ message: "User not found"})

        const isMatch = await bcrypt.compare(password, userFound.password) 

        if(!isMatch) return res.status(400).json({ message: "Incorrect password"})

        const token = await createAccessToken({id: userFound._id})

        res.cookie("token", token)
        res.json({
            id: userFound._id,
            cedula: userFound.cedula,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,

        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", {expires: new Date(0)})
    return res.sendStatus(200)
};

export const getAllUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
};

export const getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({ message: 'User not found'})
    res.json(user)
}

export const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user) return res.status(404).json({ message: 'user not found'})
    return res.sendStatus(204)
}

export const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if(!user) return res.status(404).json({ message: 'user not found'})
    res.json(user)
}



export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if(!userFound) return res.status(400).json({ message: "User not found"})

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);
  
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);
  
      const userFound = await User.findById(user.id);
      if (!userFound) return res.sendStatus(401);
  
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    });
  };