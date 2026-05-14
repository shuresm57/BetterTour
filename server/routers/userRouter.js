import { Router } from 'express';
import { requireAuth } from '../middleware/jwtAuthenticator.js';
import { findByEmail, findArtistByUserId, findVenueByUserId } from '../database/queries/userQueries.js';
import { getShowsByArtistId, getShowsWithArtistsByVenueId } from '../database/queries/showQueries.js';
import { getArtistRider, getVenueRider } from '../database/queries/riderQueries.js';

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

router.get('/api/artist/dashboard', requireAuth, (req, res) => {
  const user = findByEmail(req.user.email);
  const artist = findArtistByUserId(user.user_id);

  if (!artist) {
    return res.status(403).send('Not an artist account');
  };

  const shows = getShowsByArtistId(artist.artist_id);
  const riders = getArtistRider(artist.artist_id);

  res.send({ artist, shows, riders });
})

router.get('/api/venue/dashboard', requireAuth, (req, res) => {
  const user = findByEmail(req.user.email);
  const venue = findVenueByUserId(user.user_id);
  if (!venue) {
    return res.status(403).send('Not a venue account');
  }
  const shows = getShowsWithArtistsByVenueId(venue.venue_id); 
  const techSpecs = getVenueRider(venue.venue_id);

  res.send({ venue, shows, techSpecs });
});

export default router;
