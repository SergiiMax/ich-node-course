import jwt from 'jsonwebtoken';
import config from '../db/config/index.js';

export default function authMiddleware(req, res, next){
  const header =
    req.headers.authorization;
  if(!header) {
    return res.status(401).json({
      error:'Token required'
    });
  }

  const token =
    header.replace('Bearer ','');
  try {
    const payload =
      jwt.verify(
        token,
        config.auth.jwtSecret
      );
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      error:'Invalid token'
    });
  }
}