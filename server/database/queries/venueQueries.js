import db from '../connection.js';

export function getVenueById (venueId) {
  return db.prepare(`
    SELECT *
    FROM venue
    WHERE venue_id = ?
    `).get(venueId);
}

export function createVenue (venueData) {
  const { venueName, address, bio, contactEmail } = venueData;

  return db.prepare(`
    INSERT INTO venue (venue_name, address, bio, contact_email)
    VALUES (?, ?, ?, ?);
    `).run(venueName, address, bio, contactEmail);
}

export function updateVenue (venueId, venueData) {
  const { venueName, address, bio, contactEmail } = venueData;

  return db.prepare(`
    UPDATE venue
    SET venue_name = ?, address = ?, bio = ?, contact_email = ?
    WHERE venue_id = ?;
    `).run(venueName, address, bio, contactEmail, venueId);
}

export function deleteVenue (venueId) {
  return db.prepare(`
    DELETE FROM venue
    WHERE venue_id = ?;
    `).run(venueId);
}
