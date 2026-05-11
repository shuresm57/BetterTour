import { Router } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { authLimiter } from '../middleware/rateLimiters.js';
import { hashPassword, comparePassword } from '../util/passwordUtil.js';
import { sendWelcomeEmail, sendPasswordRecoveryEmail } from '../util/emailUtil.js';
import { findByEmail, findArtistByUserId, saveUser } from '../database/queries/userQueries.js';
import { setExpiryTokenByEmail, findUserByToken, updateUserAndToken } from '../database/queries/authQueries.js';

const router = Router();

router.post('/api/register', authLimiter, async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).send('Email and password are required.');
  }

  try {
    const existingUser = findByEmail(email);
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await hashPassword(password);
    saveUser(email, hashedPassword);
    sendWelcomeEmail(email, email);
    res.status(201).send('User registered successfully');
  } catch {
    res.status(500).send('Error registering user');
  }
});

router.post('/api/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email, password });

  try {
    const user = findByEmail(email);
    console.log('User found:', user);

    if (!user || !(await comparePassword(password, user.password_hash))) {
      return res.status(401).send('Invalid credentials.');
    }

    const type = findArtistByUserId(user.user_id) ? 'artist' : 'venue';

    const token = jwt.sign(
      { email: user.email, id: user.user_id, type },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000
    });

    res.status(200).send(`${email} logged in successfully`);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Login failed');
  }
});

router.post('/api/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.status(200).send('Logged out successfully');
});

router.post('/api/request-reset', authLimiter, (req, res) => {
  const { email } = req.body;
  const user = findByEmail(email);

  if (!user) {
    return res.status(404).send('No account with that email.');
  }

  const token = crypto.randomUUID();
  const expiry = Date.now() + 15 * 60 * 1000;

  setExpiryTokenByEmail(token, expiry, email);
  sendPasswordRecoveryEmail(email, user.email, `${process.env.CLIENT_URL}/reset-password?token=${token}`);

  res.status(200).send('Reset link sent.');
});

router.post('/api/reset-password', authLimiter, async (req, res) => {
  const { token, newPassword } = req.body;
  const user = findUserByToken(token, Date.now());
  if (!user) {
    return res.status(400).send('Invalid or expired token.');
  }

  const hashed = await hashPassword(newPassword);
  updateUserAndToken(hashed, user.user_id);

  res.status(200).send('Password updated successfully.');
});

export default router;
