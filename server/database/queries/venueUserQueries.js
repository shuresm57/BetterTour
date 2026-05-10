import db from '../connection.js';

export function getUsersByVenueId (venueId) {
  return db.prepare(`
    SELECT *
    FROM venue_user
    WHERE venue_id = ?
    `).all(venueId);
}

export function createVenueUser (venueUserData) {
  const { venueId, userId, role } = venueUserData;

  return db.prepare(`
    INSERT INTO venue_user (venue_id, user_id, role)
    VALUES (?, ?, ?);
    `).run(venueId, userId, role);
}

export function deleteVenueUser (venueId, userId) {
  return db.prepare(`
    DELETE FROM venue_user
    WHERE venue_id = ? AND user_id = ?;
    `).run(venueId, userId);
}
