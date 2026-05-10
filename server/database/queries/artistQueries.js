import db from '../connection.js';

export function getArtistById (artistId) {
  return db.prepare(`
    SELECT *
    FROM artist
    WHERE artist_id = ?
    `).get(artistId);
}

export function createArtist (artistData) {
  const { artistName, bio, contactEmail } = artistData;

  return db.prepare(`
    INSERT INTO artist (artist_name, bio, contact_email)
    VALUES (?, ?, ?);
    `).run(artistName, bio, contactEmail);
}

export function updateArtist (artistId, artistData) {
  const { artistName, bio, contactEmail } = artistData;

  return db.prepare(`
    UPDATE artist
    SET artist_name = ?, bio = ?, contact_email = ?
    WHERE artist_id = ?;
    `).run(artistName, bio, contactEmail, artistId);
}

export function deleteArtist (artistId) {
  return db.prepare(`
    DELETE FROM artist
    WHERE artist_id = ?;
    `).run(artistId);
}
