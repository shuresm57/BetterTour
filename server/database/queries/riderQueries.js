import db from '../connection.js';

export function getArtistRider (artistId) {
  return db.prepare(`
        SELECT rider_name, rider_url
        FROM rider
        WHERE artist_id = ?
    `).get(artistId);
}

export function getVenueRider (venueId) {
  return db.prepare(`
        SELECT rider_name, rider_url
        FROM rider
        WHERE venue_id = ?
    `).run(venueId);
}

export function createArtistRider (artistRiderData) {
  const { artistId, riderName, riderUrl } = artistRiderData;

  return db.prepare(`
        INSERT INTO rider (artist_id, rider_name, rider_url)
        VALUES (?, ?, ?);    
    `).run(artistId, riderName, riderUrl);
}

export function createVenueRider (venueRiderData) {
  const { venueId, riderName, riderUrl } = venueRiderData;

  return db.prepare(`
        INSERT INTO rider (venue_id, rider_name, rider_url)
        VALUES (?, ?, ?);    
    `).run(venueId, riderName, riderUrl);
}
