import 'dotenv/config';

if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'replace_this_with_a_long_random_secret') {
  throw new Error('Set JWT_SECRET in .env');
}

export default {
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpires: '1d',
  },
};
