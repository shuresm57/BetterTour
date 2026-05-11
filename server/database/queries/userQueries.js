import db from '../connection.js';

export function findByEmail (email) {
  return db.prepare(`
    SELECT * 
    FROM user
    WHERE email = ?
    `).get(email);
}

export function findArtistByUserId (userId) {
  return db.prepare(`
    SELECT artist.* 
    FROM artist 
    JOIN artist_user ON artist_user.artist_id = artist.artist_id 
    WHERE artist_user.user_id = ?
    `).get(userId);
}

export function findVenueByUserId (userId) {
  return db.prepare(`
    SELECT venue.* 
    FROM venue 
    JOIN venue_user ON venue_user.venue_id = venue.venue_id 
    WHERE venue_user.user_id = ?
    `).get(userId);
}

export function saveUser (email, password) {
  return db.prepare(`
    INSERT INTO user (email, password_hash)
    VALUES (?, ?);
    `).run(email, password);
}
