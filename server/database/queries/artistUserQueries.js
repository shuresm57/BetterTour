import db from '../connection.js';

export function getUsersByArtistId (artistId) {
  return db.prepare(`
    SELECT *
    FROM artist_user
    WHERE artist_id = ?
    `).all(artistId);
}

export function createArtistUser (artistUserData) {
  const { artistId, userId, role } = artistUserData;

  return db.prepare(`
    INSERT INTO artist_user (artist_id, user_id, role)
    VALUES (?, ?, ?);
    `).run(artistId, userId, role);
}

export function deleteArtistUser (artistId, userId) {
  return db.prepare(`
    DELETE FROM artist_user
    WHERE artist_id = ? AND user_id = ?;
    `).run(artistId, userId);
}
