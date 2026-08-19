import 'dotenv/config';

export default {
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpires: '1d',
  },
};