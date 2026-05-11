import './initDatabase.js';
import db from './connection.js';
import { hashPassword } from '../util/passwordUtil.js';

//= ======================
//      USERS
//= ======================

const userPassword = await hashPassword('test1234');

const insertUser = db.prepare(`
    INSERT INTO user (email, password_hash)
    VALUES (?, ?)
`);

const users = [
  { email: 'ben@syl.dk' }, // user_id: 1
  { email: 'kenn@eyes.dk' }, // user_id: 2
  { email: 'prod@urban13.dk' }, // user_id: 3
  { email: 'prod@train.dk' } // user_id: 4
];

for (const u of users) insertUser.run(u.email, userPassword);

//= ======================
//      ARTISTS
//= ======================

const insertArtist = db.prepare(`
    INSERT INTO artist (artist_name, bio, contact_email)
    VALUES (?, ?, ?)
`);

const eyesBand = {
  artist_name: 'Eyes',
  bio: 'A hardcore punk band from Copenhagen',
  contact_email: 'kenn@eyes.dk'
};

const sylBand = {
  artist_name: 'Syl',
  bio: 'Post-Hardcore Punk',
  contact_email: 'ben@syl.dk'
};

// artist_id: 1
insertArtist.run(
  eyesBand.artist_name,
  eyesBand.bio,
  eyesBand.contact_email
);

// artist_id: 2
insertArtist.run(
  sylBand.artist_name,
  sylBand.bio,
  sylBand.contact_email
);

//= ======================
//      VENUES
//= ======================

const insertVenue = db.prepare(`
    INSERT INTO venue (venue_name, address, bio, contact_email)
    VALUES (?, ?, ?, ?)
`);

const urban13Venue = {
  venue_name: 'Urban13',
  address: 'Bispeengen 20, 2000 Frederiksberg',
  bio: 'GARAGEN er URBAN 13s største venue – anlagt i 2019 og skabt til at rumme både vellydende koncerter, stemningsfulde fester og alt derimellem. Her er der højt til loftet, rå rammer og masser af fleksibilitet.',
  contact_email: 'prod@urban13.dk'
};

const trainVenue = {
  venue_name: 'Train',
  address: 'Toldbodgade 6, 8000 Aarhus C',
  bio: 'TRAIN er et af Aarhus mest markante spillesteder og har siden 1998 præsenteret nationale og internationale artister inden for rock, pop, elektronisk, urban og metal. Med fokus på kvalitet, udvikling og stærke koncertoplevelser fungerer TRAIN som et centralt musikalsk kraftcenter i byen.',
  contact_email: 'prod@train.dk'
};

// venue_id: 1
insertVenue.run(
  urban13Venue.venue_name,
  urban13Venue.address,
  urban13Venue.bio,
  urban13Venue.contact_email
);

// venue_id: 2
insertVenue.run(
  trainVenue.venue_name,
  trainVenue.address,
  trainVenue.bio,
  trainVenue.contact_email
);

//= ======================
//       RIDERS
//= ======================

const insertRider = db.prepare(`
    INSERT INTO rider (artist_id, venue_id, rider_name, rider_url)
    VALUES (?, ?, ?, ?)
`);

// Eyes - tech rider (artist_id: 1)
insertRider.run(
  1,
  null,
  'Tech Rider',
  'https://docs.google.com/document/d/1NDmTZERWDT9aAUpNqTS-TfJjn5Ee2SZlTD9Po4n8-rI/edit?tab=t.0'
);

// Eyes - hospitality rider (artist_id: 1)
insertRider.run(
  1,
  null,
  'Hospitality Rider',
  'https://docs.google.com/document/d/1NDmTZERWDT9aAUpNqTS-TfJjn5Ee2SZlTD9Po4n8-rI/edit?tab=t.0'
);

// Syl - tech rider (artist_id: 2)
insertRider.run(
  2,
  null,
  'Tech Rider',
  'https://docs.google.com/document/d/1NDmTZERWDT9aAUpNqTS-TfJjn5Ee2SZlTD9Po4n8-rI/edit?tab=t.0'
);

// Syl - hospitality rider (artist_id: 2)
insertRider.run(
  2,
  null,
  'Hospitality Rider',
  'https://docs.google.com/document/d/1NDmTZERWDT9aAUpNqTS-TfJjn5Ee2SZlTD9Po4n8-rI/edit?tab=t.0'
);

// Urban13 - tech rider (venue_id: 1)
insertRider.run(
  null,
  1,
  'Tech Rider',
  'https://docs.google.com/document/d/1NDmTZERWDT9aAUpNqTS-TfJjn5Ee2SZlTD9Po4n8-rI/edit?tab=t.0'
);

// Urban13 - hospitality rider (venue_id: 1)
insertRider.run(
  null,
  1,
  'Hospitality Rider',
  'https://docs.google.com/document/d/1NDmTZERWDT9aAUpNqTS-TfJjn5Ee2SZlTD9Po4n8-rI/edit?tab=t.0'
);

// Train - tech rider (venue_id: 2)
insertRider.run(
  null,
  2,
  'Tech Rider',
  'https://cdn.sanity.io/files/zr3nrpl4/production/f2eb0654d3ec368db3e99c5be02a9e4e749fa7b1.pdf'
);

// Train - hospitality rider (venue_id: 2)
insertRider.run(
  null,
  2,
  'Hospitality Rider',
  'https://cdn.sanity.io/files/zr3nrpl4/production/f2eb0654d3ec368db3e99c5be02a9e4e749fa7b1.pdf'
);

//= ======================
//      ARTIST_USER
//= ======================

const insertArtistUser = db.prepare(`
    INSERT INTO artist_user (artist_id, user_id, role)
    VALUES (?, ?, ?)
`);

// Eyes, kenn
insertArtistUser.run(1, 2, 'member');
// Syl, ben
insertArtistUser.run(2, 1, 'member');

//= ======================
//      VENUE_USER
//= ======================

const insertVenueUser = db.prepare(`
    INSERT INTO venue_user (venue_id, user_id, role)
    VALUES (?, ?, ?)
`);

// Urban13, prod@urban13.dk
insertVenueUser.run(1, 3, 'member');
// Train, prod@train.dk
insertVenueUser.run(2, 4, 'member');

//= ======================
//      SHOWS
//= ======================

const insertShow = db.prepare(`
    INSERT INTO show (date, schedule, event_name, contact_of_day, status, link_code) 
    VALUES (?, ?, ?, ?, ?, ?)
`);

const eyesShowOne = {
  date: '2026-05-08',
  schedule: {
    getin: '19:00',
    linecheck: '21:40',
    show_start: '22:30',
    show_length: '35min'
  },
  event_name: 'Eyes | Colossal Weekend 2026 (Lille Vega)',
  contact_of_day: '25148570 - Alice (Stage Manager)',
  status: 'confirmed',
  link_code: 'XK9-482'
};

const eyesShowTwo = {
  date: '2026-05-08',
  schedule: {
    getin: '16:00',
    soundcheck: '17:00',
    soundcheck_support: '18:00',
    support_showtime: '20:30',
    changeover: '21:00',
    show_start: '21:30',
    show_length: '45min',
    curfew: '00:00'
  },
  event_name: 'Eyes | Train 2026',
  contact_of_day: '25148570 - Alice (Stage Manager)',
  status: 'confirmed',
  link_code: 'ZJ7-371'
};

const sylShowOne = {
  date: '2027-07-01',
  schedule: {
    getin: '16:00',
    linecheck: '23:30',
    show_start: '00:30',
    show_length: '45min'
  },
  event_name: 'Syl | Roskilde Festival (Arena)',
  contact_of_day: '25148570 - Signe (Artist Manager)',
  status: 'confirmed',
  link_code: '9K1-T3G'
};

const sylShowTwo = {
  date: '2026-12-07',
  schedule: {
    soundcheck: '17:00',
    show: '20:00'
  },
  event_name: 'Syl | Roars Birthday Punk Bash',
  contact_of_day: '25148570 - Roar',
  status: 'pending',
  link_code: '8T2-BR1'
};

const sylShowThree = {
  date: '2026-12-14',
  schedule: {
    soundcheck: '19:00',
    show: '20:00',
    dj_set: '22:00',
    curfew: '00:00'
  },
  event_name: 'Syl | Release Party (Urban 13)',
  contact_of_day: '25148570 - Valdemar',
  status: 'pending',
  link_code: '4P5-UR1'
};

const urban13RentalOne = {
  date: '2026-06-14',
  schedule: {
    doors: '17:00',
    show_start: '18:00',
    curfew: '23:00'
  },
  event_name: 'Urban13 | Mias 30 års fødselsdag',
  contact_of_day: '40281733 - Mia',
  status: 'confirmed',
  link_code: 'U13-B30'
};

const urban13RentalTwo = {
  date: '2026-09-03',
  schedule: {
    doors: '18:00',
    programme_start: '19:00',
    curfew: '22:00'
  },
  event_name: 'Urban13 | Frederiksberg Golfklub Årsmøde',
  contact_of_day: '31445872 - Flemming (Formand)',
  status: 'confirmed',
  link_code: 'U13-GLF'
};

const urban13ShowOne = {
  date: '2026-10-22',
  schedule: {
    getin: '14:00',
    soundcheck: '16:00',
    doors: '19:00',
    show_start: '20:00',
    show_length: '75min',
    curfew: '23:00'
  },
  event_name: 'Viagra Boys | Urban13',
  contact_of_day: '25148570 - Valdemar (Production Manager)',
  status: 'confirmed',
  link_code: 'VB1-U13'
};

const trainRentalOne = {
  date: '2026-07-18',
  schedule: {
    doors: '17:00',
    show_start: '18:00',
    curfew: '23:00'
  },
  event_name: 'Train | Kaspers 30 års fødselsdag',
  contact_of_day: '22334455 - Kasper',
  status: 'confirmed',
  link_code: 'TRN-B30'
};

const trainRentalTwo = {
  date: '2026-11-12',
  schedule: {
    doors: '17:30',
    programme_start: '18:00',
    dinner: '19:00',
    curfew: '22:00'
  },
  event_name: 'Train | Aarhus Golfklub Årsmøde',
  contact_of_day: '87654321 - Jørgen (Kasserer)',
  status: 'confirmed',
  link_code: 'TRN-GLF'
};

const trainShowOne = {
  date: '2026-11-28',
  schedule: {
    getin: '12:00',
    soundcheck: '15:00',
    doors: '19:00',
    show_start: '20:30',
    show_length: '90min',
    curfew: '00:00'
  },
  event_name: 'Grandmaster Flash | Train',
  contact_of_day: '25148570 - Alice (Production Manager)',
  status: 'confirmed',
  link_code: 'GMF-TRN'
};

// show_id: 1
insertShow.run(
  eyesShowOne.date,
  JSON.stringify(eyesShowOne.schedule),
  eyesShowOne.event_name,
  eyesShowOne.contact_of_day,
  eyesShowOne.status,
  eyesShowOne.link_code
);

// show_id: 2
insertShow.run(
  eyesShowTwo.date,
  JSON.stringify(eyesShowTwo.schedule),
  eyesShowTwo.event_name,
  eyesShowTwo.contact_of_day,
  eyesShowTwo.status,
  eyesShowTwo.link_code
);

// show_id: 3
insertShow.run(
  sylShowOne.date,
  JSON.stringify(sylShowOne.schedule),
  sylShowOne.event_name,
  sylShowOne.contact_of_day,
  sylShowOne.status,
  sylShowOne.link_code
);

// show_id: 4
insertShow.run(
  sylShowTwo.date,
  JSON.stringify(sylShowTwo.schedule),
  sylShowTwo.event_name,
  sylShowTwo.contact_of_day,
  sylShowTwo.status,
  sylShowTwo.link_code
);

// show_id: 5
insertShow.run(
  sylShowThree.date,
  JSON.stringify(sylShowThree.schedule),
  sylShowThree.event_name,
  sylShowThree.contact_of_day,
  sylShowThree.status,
  sylShowThree.link_code
);

// show_id: 6
insertShow.run(
  urban13RentalOne.date,
  JSON.stringify(urban13RentalOne.schedule),
  urban13RentalOne.event_name,
  urban13RentalOne.contact_of_day,
  urban13RentalOne.status,
  urban13RentalOne.link_code
);

// show_id: 7
insertShow.run(
  urban13RentalTwo.date,
  JSON.stringify(urban13RentalTwo.schedule),
  urban13RentalTwo.event_name,
  urban13RentalTwo.contact_of_day,
  urban13RentalTwo.status,
  urban13RentalTwo.link_code
);

// show_id: 8
insertShow.run(
  urban13ShowOne.date,
  JSON.stringify(urban13ShowOne.schedule),
  urban13ShowOne.event_name,
  urban13ShowOne.contact_of_day,
  urban13ShowOne.status,
  urban13ShowOne.link_code
);

// show_id: 9
insertShow.run(
  trainRentalOne.date,
  JSON.stringify(trainRentalOne.schedule),
  trainRentalOne.event_name,
  trainRentalOne.contact_of_day,
  trainRentalOne.status,
  trainRentalOne.link_code
);

// show_id: 10
insertShow.run(
  trainRentalTwo.date,
  JSON.stringify(trainRentalTwo.schedule),
  trainRentalTwo.event_name,
  trainRentalTwo.contact_of_day,
  trainRentalTwo.status,
  trainRentalTwo.link_code
);

// show_id: 11
insertShow.run(
  trainShowOne.date,
  JSON.stringify(trainShowOne.schedule),
  trainShowOne.event_name,
  trainShowOne.contact_of_day,
  trainShowOne.status,
  trainShowOne.link_code
);

//= ======================
//  SHOW PARTICIPANTS
//= ======================

const insertParticipant = db.prepare(`
    INSERT INTO show_participant (show_id, user_id, artist_id, venue_id, role)
    VALUES (?, ?, ?, ?, ?)
`);

// eyesShowOne - no venue yet
insertParticipant.run(1, 2, 1, null, 'artist');

// eyesShowTwo - Eyes @ Train
insertParticipant.run(2, 2, 1, 2, 'artist');
insertParticipant.run(2, 4, 1, 2, 'venue');

// sylShowOne - no venue yet
insertParticipant.run(3, 1, 2, null, 'artist');

// sylShowTwo - no venue yet
insertParticipant.run(4, 1, 2, null, 'artist');

// sylShowThree - Syl @ Urban13
insertParticipant.run(5, 1, 2, 1, 'artist');
insertParticipant.run(5, 3, 2, 1, 'venue');

// urban13RentalOne - venue only
insertParticipant.run(6, 3, null, 1, 'venue');

// urban13RentalTwo - venue only
insertParticipant.run(7, 3, null, 1, 'venue');

// urban13ShowOne - external artist (Viagra Boys), venue only
insertParticipant.run(8, 3, null, 1, 'venue');

// trainRentalOne - venue only
insertParticipant.run(9, 4, null, 2, 'venue');

// trainRentalTwo - venue only
insertParticipant.run(10, 4, null, 2, 'venue');

// trainShowOne - external artist (Grandmaster Flash), venue only
insertParticipant.run(11, 4, null, 2, 'venue');
