import {
  findByEmail, saveUser,
  setExpiryTokenByEmail, findUserByToken, updateUserAndToken,
  findArtistByUserId, findVenueByUserId
} from '../database/queries.js';

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

  try {
    const user = findByEmail(email);

    if (!user || !(await comparePassword(password, user.password_hash))) {
      return res.status(401).send('Invalid credentials.');
    }

    const type = buildArtistPayload(user) ? 'artist' : 'venue';

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
  } catch {
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

router.get('/api/home', requireAuth, (req, res) => {
  const user = findByEmail(req.user.email);
  if (!user) {
    return res.status(404).send({ errorMessage: 'User not found' });
  }

  const payload = buildArtistPayload(user) || buildVenuePayload(user);
  if (!payload) {
    return res.status(403).send({ errorMessage: 'No entity linked to this account' });
  }

  res.send({ data: payload });
});

router.get('/api/emails/:email', (req, res) => {
  const found = findByEmail(req.params.email);
  if (found) {
    return res.status(200).send({ data: { exists: true } });
  }
  res.status(404).send({ data: { exists: false } });
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