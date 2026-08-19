import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../db/models/index.js';
import config from '../db/config/index.js';

export async function register(req,res){
  try {
    const {
      fullname,
      email,
      password
    } = req.body;

    const exists = await User.findOne({
      where:{email}
    });
    if(exists) {
      return res.status(409).json({
        error:'User already exists'
      });
    }
    const passwordHash =
      await bcrypt.hash(password, 10);
    const user = await User.create({
      fullname,
      email,
      passwordHash
    });
    res.status(201).json({
      id: user.id,
      fullname: user.fullname,
      email: user.email
    });
  } catch(error){
    res.status(500).json({
      error:error.message
    });
  }
}

export async function login(req,res){
  try{
    const {
      email,
      password
    } = req.body;
    const user = await User.findOne({
      where:{email}
    });

    if(!user){
      return res.status(401).json({
        error:'Invalid credentials'
      });
    }

    const valid =
      await bcrypt.compare(
        password,
        user.passwordHash
      );
    if(!valid){
      return res.status(401).json({
        error:'Invalid credentials'
      });
    }
    const token = jwt.sign(
      {
        id:user.id,
        email:user.email
      },
      config.auth.jwtSecret,
      {
        expiresIn:
        config.auth.jwtExpires
      }
    );
    res.json({
      token
    });
  }catch(error){
    res.status(500).json({
      error:error.message
    });
  }
}