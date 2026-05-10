import db from './connection.js';

const idPrimaryKey = 'INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT';

db.exec(`
  CREATE TABLE IF NOT EXISTS user (
    user_id ${idPrimaryKey},
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    reset_token VARCHAR(255),
    reset_token_expiry INTEGER,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS artist (
    artist_id ${idPrimaryKey},
    artist_name TEXT, 
    bio TEXT,
    contact_email VARCHAR(255),
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS venue (
    venue_id ${idPrimaryKey},
    venue_name TEXT,
    address TEXT,
    bio TEXT,
    contact_email VARCHAR(255),
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS show (
    show_id ${idPrimaryKey},
    date TEXT NOT NULL,
    schedule TEXT,
    event_name TEXT,
    contact_of_day TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    link_code TEXT UNIQUE NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS rider (
    rider_id ${idPrimaryKey},
    artist_id INTEGER REFERENCES artist(artist_id),
    venue_id INTEGER REFERENCES venue(venue_id),
    rider_name VARCHAR(255),
    rider_url TEXT,
    CHECK (
      (artist_id IS NOT NULL AND venue_id IS NULL) OR
      (artist_id IS NULL AND venue_id IS NOT NULL)
    )
  );
  
  CREATE INDEX idx_rider_artist_id ON rider(artist_id);
  CREATE INDEX idx_rider_venue_id ON rider(venue_id);

  CREATE TABLE IF NOT EXISTS show_participant (
    participant_id ${idPrimaryKey},
    show_id INTEGER NOT NULL REFERENCES show(show_id),
    user_id INTEGER NOT NULL REFERENCES user(user_id),
    artist_id INTEGER REFERENCES artist(artist_id),
    venue_id INTEGER REFERENCES venue(venue_id),
    role TEXT NOT NULL CHECK (role IN ('artist', 'venue')),
    joined_at TEXT DEFAULT (datetime('now')),
    UNIQUE(show_id, role)
    );

  CREATE INDEX idx_show_participant_show_id ON show_participant(show_id);
  CREATE INDEX idx_show_participant_user_id ON show_participant(user_id);

  CREATE TABLE IF NOT EXISTS artist_user (
    artist_id INTEGER NOT NULL REFERENCES artist(artist_id),
    user_id INTEGER NOT NULL REFERENCES user(user_id),  -- was users
    role TEXT NOT NULL DEFAULT 'member',
    PRIMARY KEY (artist_id, user_id)
  );

  CREATE TABLE IF NOT EXISTS venue_user (
    venue_id INTEGER NOT NULL REFERENCES venue(venue_id),
    user_id INTEGER NOT NULL REFERENCES user(user_id),  -- was users
    role TEXT NOT NULL DEFAULT 'member',
    PRIMARY KEY (venue_id, user_id)
  );

  
`);
