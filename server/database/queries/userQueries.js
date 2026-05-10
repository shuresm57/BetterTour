import db from '../connection.js';

export function createUser(userData){

    const { email, password } = userData;

    db.prepare(`
        INSERT INTO user (email, pass)
        VALUES (?, ?);
    `).run(email, password);

};

export function createArtistUser(artistUserDate){

    const { artistId, userId, role }

    db.prepare(`
        INSERT INTO artist_user (artist_id, user_id, role)
        VALUES (?, ?, ?);
    `).run(artistId, userId, role);

};

export function createVenueUser(artistUserDate){

    const { venueId, userId, role }

    db.prepare(`
        INSERT INTO venue_user (venue_id, user_id, role)
        VALUES (?, ?, ?);
    `).run(venueId, userId, role);

};