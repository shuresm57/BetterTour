import db from '../connection.js';

export function getArtistRider (artistId) {
  return db.prepare(`
        SELECT rider_name AS name, rider_url AS url
        FROM rider
        WHERE artist_id = ?
    `).all(artistId);
}

export function getVenueRider (venueId) {
  return db.prepare(`
        SELECT rider_name AS name, rider_url AS url
        FROM rider
        WHERE venue_id = ?
    `).all(venueId);
}

export function updateRider (riderId, riderData) {
  const { riderName, riderUrl } = riderData;

  return db.prepare(`
    UPDATE rider
    SET rider_name = ?, rider_url = ?
    WHERE rider_id = ?;
    `).run(riderName, riderUrl, riderId);
}

export function createArtistRider (artistRiderData) {
  const { id, artistId, riderName, riderUrl } = artistRiderData;

  return db.prepare(`
        INSERT INTO rider (rider_id, artist_id, rider_name, rider_url)
        VALUES (?, ?, ?, ?);
    `).run(id, artistId, riderName, riderUrl);
}

export function createVenueRider (venueRiderData) {
  const { id, venueId, riderName, riderUrl } = venueRiderData;

  return db.prepare(`
        INSERT INTO rider (rider_id, venue_id, rider_name, rider_url)
        VALUES (?, ?, ?, ?);
    `).run(id, venueId, riderName, riderUrl);
}
