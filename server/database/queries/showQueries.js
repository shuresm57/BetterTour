import db from '../connection.js'

export function getShowLinkCode(linkCode) {
    return db.prepare(`
        SELECT * FROM show WHERE link_code = ?
    `).run(linkCode);
}


export function updateShow (showId, showData) {
  const { date, schedule, eventName, contactOfDay, status } = showData;

  return db.prepare(`
    UPDATE show
    SET date = ?, schedule = ?, event_name = ?, contact_of_day = ?, status = ?
    WHERE show_id = ?;
    `).run(date, schedule, eventName, contactOfDay, status, showId);
}

export function createShow(showData) {
     const {
        date, schedule, eventName,
        contactOfDay, status
    } = showData;

    return db.prepare(`
        INSERT INTO show (date, schedule, event_name, contact_of_day, status)
        VALUES (?, ?, ?, ?, ?);    
    `).run(date, schedule, eventName, contactOfDay, status)
}