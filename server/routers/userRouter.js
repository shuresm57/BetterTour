import { Router } from 'express';
import { requireAuth } from '../middleware/jwtAuthenticator.js';
import { findByEmail, findArtistByUserId, findVenueByUserId } from '../database/queries/userQueries.js';

const router = Router();

router.get('/api/home', requireAuth, (req, res) => {
  const user = findByEmail(req.user.email);
  if (!user) {
    return res.status(404).send({ errorMessage: 'User not found' });
  }

  const artist = findArtistByUserId(user.user_id);
  const type = artist ? 'artist' : 'venue';
  const payload = artist || findVenueByUserId(user.user_id);

  if (!payload) {
    return res.status(403).send({ errorMessage: 'No entity linked to this account' });
  }

  res.send({ data: payload, type });
});

router.get('/api/emails/:email', (req, res) => {
  const found = findByEmail(req.params.email);
  if (found) {
    return res.status(200).send({ data: { exists: true } });
  }
  res.status(404).send({ data: { exists: false } });
});

export default router;
