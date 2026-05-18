import './initDatabase.js';
import db from './connection.js';
import { hashPassword } from '../util/passwordUtil.js';
import { v7 as uuidv7 } from 'uuid';

//= ======================
//      USERS
//= ======================

const userPassword = await hashPassword('test1234');

const insertUser = db.prepare(`
    INSERT INTO user (user_id, email, password_hash)
    VALUES (?, ?, ?)
`);

const benId = uuidv7();
const kennId = uuidv7();
const urban13ProdId = uuidv7();
const trainProdId = uuidv7();

insertUser.run(benId, 'ben@syl.dk', userPassword);
insertUser.run(kennId, 'kenn@eyes.dk', userPassword);
insertUser.run(urban13ProdId, 'prod@urban13.dk', userPassword);
insertUser.run(trainProdId, 'prod@train.dk', userPassword);

//= ======================
//      ARTISTS
//= ======================

const insertArtist = db.prepare(`
    INSERT INTO artist (artist_id, artist_name, bio, contact_email)
    VALUES (?, ?, ?, ?)
`);

const eyesId = uuidv7();
const sylId = uuidv7();

insertArtist.run(eyesId, 'Eyes', 'A hardcore punk band from Copenhagen', 'kenn@eyes.dk');
insertArtist.run(sylId, 'Syl', 'Post-Hardcore Punk', 'ben@syl.dk');

//= ======================
//      VENUES
//= ======================

const insertVenue = db.prepare(`
    INSERT INTO venue (venue_id, venue_name, address, bio, contact_email)
    VALUES (?, ?, ?, ?, ?)
`);

const urban13Id = uuidv7();
const trainId = uuidv7();

insertVenue.run(
  urban13Id,
  'Urban13',
  'Bispeengen 20, 2000 Frederiksberg',
  'GARAGEN er URBAN 13s største venue – anlagt i 2019 og skabt til at rumme både vellydende koncerter, stemningsfulde fester og alt derimellem. Her er der højt til loftet, rå rammer og masser af fleksibilitet.',
  'prod@urban13.dk'
);

insertVenue.run(
  trainId,
  'Train',
  'Toldbodgade 6, 8000 Aarhus C',
  'TRAIN er et af Aarhus mest markante spillesteder og har siden 1998 præsenteret nationale og internationale artister inden for rock, pop, elektronisk, urban og metal. Med fokus på kvalitet, udvikling og stærke koncertoplevelser fungerer TRAIN som et centralt musikalsk kraftcenter i byen.',
  'prod@train.dk'
);

//= ======================
//       RIDERS
//= ======================

const insertRider = db.prepare(`
    INSERT INTO rider (rider_id, artist_id, venue_id, rider_name, rider_url)
    VALUES (?, ?, ?, ?, ?)
`);

const googleDoc = 'https://docs.google.com/document/d/1NDmTZERWDT9aAUpNqTS-TfJjn5Ee2SZlTD9Po4n8-rI/edit?tab=t.0';
const trainPdf = 'https://cdn.sanity.io/files/zr3nrpl4/production/f2eb0654d3ec368db3e99c5be02a9e4e749fa7b1.pdf';

insertRider.run(uuidv7(), eyesId, null, 'Tech Rider', googleDoc);
insertRider.run(uuidv7(), eyesId, null, 'Hospitality Rider', googleDoc);
insertRider.run(uuidv7(), sylId, null, 'Tech Rider', googleDoc);
insertRider.run(uuidv7(), sylId, null, 'Hospitality Rider', googleDoc);
insertRider.run(uuidv7(), null, urban13Id, 'Tech Rider', googleDoc);
insertRider.run(uuidv7(), null, urban13Id, 'Hospitality Rider', googleDoc);
insertRider.run(uuidv7(), null, trainId, 'Tech Rider', trainPdf);
insertRider.run(uuidv7(), null, trainId, 'Hospitality Rider', trainPdf);

//= ======================
//      ARTIST_USER
//= ======================

const insertArtistUser = db.prepare(`
    INSERT INTO artist_user (artist_id, user_id, role)
    VALUES (?, ?, ?)
`);

insertArtistUser.run(eyesId, kennId, 'member');
insertArtistUser.run(sylId, benId, 'member');

//= ======================
//      VENUE_USER
//= ======================

const insertVenueUser = db.prepare(`
    INSERT INTO venue_user (venue_id, user_id, role)
    VALUES (?, ?, ?)
`);

insertVenueUser.run(urban13Id, urban13ProdId, 'member');
insertVenueUser.run(trainId, trainProdId, 'member');

//= ======================
//      SHOWS
//= ======================

const insertShow = db.prepare(`
    INSERT INTO show (show_id, date, schedule, event_name, contact_of_day, status, link_code)
    VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const eyesShowOneId = uuidv7();
const eyesShowTwoId = uuidv7();
const sylShowOneId = uuidv7();
const sylShowTwoId = uuidv7();
const sylShowThreeId = uuidv7();
const urban13RentalOneId = uuidv7();
const urban13RentalTwoId = uuidv7();
const urban13ShowOneId = uuidv7();
const trainRentalOneId = uuidv7();
const trainRentalTwoId = uuidv7();
const trainShowOneId = uuidv7();

insertShow.run(eyesShowOneId, '2026-05-08', JSON.stringify({ getin: '19:00', linecheck: '21:40', show_start: '22:30', show_length: '35min' }), 'Eyes | Colossal Weekend 2026 (Lille Vega)', '25148570 - Alice (Stage Manager)', 'confirmed', 'XK9-482');
insertShow.run(eyesShowTwoId, '2026-05-08', JSON.stringify({ getin: '16:00', soundcheck: '17:00', soundcheck_support: '18:00', support_showtime: '20:30', changeover: '21:00', show_start: '21:30', show_length: '45min', curfew: '00:00' }), 'Eyes | Train 2026', '25148570 - Alice (Stage Manager)', 'confirmed', 'ZJ7-371');
insertShow.run(sylShowOneId, '2027-07-01', JSON.stringify({ getin: '16:00', linecheck: '23:30', show_start: '00:30', show_length: '45min' }), 'Syl | Roskilde Festival (Arena)', '25148570 - Signe (Artist Manager)', 'confirmed', '9K1-T3G');
insertShow.run(sylShowTwoId, '2026-12-07', JSON.stringify({ soundcheck: '17:00', show: '20:00' }), 'Syl | Roars Birthday Punk Bash', '25148570 - Roar', 'pending', '8T2-BR1');
insertShow.run(sylShowThreeId, '2026-12-14', JSON.stringify({ soundcheck: '19:00', show: '20:00', dj_set: '22:00', curfew: '00:00' }), 'Syl | Release Party (Urban 13)', '25148570 - Valdemar', 'pending', '4P5-UR1');
insertShow.run(urban13RentalOneId, '2026-06-14', JSON.stringify({ doors: '17:00', show_start: '18:00', curfew: '23:00' }), 'Urban13 | Mias 30 års fødselsdag', '40281733 - Mia', 'confirmed', 'U13-B30');
insertShow.run(urban13RentalTwoId, '2026-09-03', JSON.stringify({ doors: '18:00', programme_start: '19:00', curfew: '22:00' }), 'Urban13 | Frederiksberg Golfklub Årsmøde', '31445872 - Flemming (Formand)', 'confirmed', 'U13-GLF');
insertShow.run(urban13ShowOneId, '2026-10-22', JSON.stringify({ getin: '14:00', soundcheck: '16:00', doors: '19:00', show_start: '20:00', show_length: '75min', curfew: '23:00' }), 'Viagra Boys | Urban13', '25148570 - Valdemar (Production Manager)', 'confirmed', 'VB1-U13');
insertShow.run(trainRentalOneId, '2026-07-18', JSON.stringify({ doors: '17:00', show_start: '18:00', curfew: '23:00' }), 'Train | Kaspers 30 års fødselsdag', '22334455 - Kasper', 'confirmed', 'TRN-B30');
insertShow.run(trainRentalTwoId, '2026-11-12', JSON.stringify({ doors: '17:30', programme_start: '18:00', dinner: '19:00', curfew: '22:00' }), 'Train | Aarhus Golfklub Årsmøde', '87654321 - Jørgen (Kasserer)', 'confirmed', 'TRN-GLF');
insertShow.run(trainShowOneId, '2026-11-28', JSON.stringify({ getin: '12:00', soundcheck: '15:00', doors: '19:00', show_start: '20:30', show_length: '90min', curfew: '00:00' }), 'Grandmaster Flash | Train', '25148570 - Alice (Production Manager)', 'confirmed', 'GMF-TRN');

//= ======================
//  SHOW PARTICIPANTS
//= ======================

const insertParticipant = db.prepare(`
    INSERT INTO show_participant (participant_id, show_id, user_id, artist_id, venue_id, role)
    VALUES (?, ?, ?, ?, ?, ?)
`);

insertParticipant.run(uuidv7(), eyesShowOneId, kennId, eyesId, null, 'artist');

insertParticipant.run(uuidv7(), eyesShowTwoId, kennId, eyesId, trainId, 'artist');
insertParticipant.run(uuidv7(), eyesShowTwoId, trainProdId, eyesId, trainId, 'venue');

insertParticipant.run(uuidv7(), sylShowOneId, benId, sylId, null, 'artist');
insertParticipant.run(uuidv7(), sylShowTwoId, benId, sylId, null, 'artist');

insertParticipant.run(uuidv7(), sylShowThreeId, benId, sylId, urban13Id, 'artist');
insertParticipant.run(uuidv7(), sylShowThreeId, urban13ProdId, sylId, urban13Id, 'venue');

insertParticipant.run(uuidv7(), urban13RentalOneId, urban13ProdId, null, urban13Id, 'venue');
insertParticipant.run(uuidv7(), urban13RentalTwoId, urban13ProdId, null, urban13Id, 'venue');
insertParticipant.run(uuidv7(), urban13ShowOneId, urban13ProdId, null, urban13Id, 'venue');

insertParticipant.run(uuidv7(), trainRentalOneId, trainProdId, null, trainId, 'venue');
insertParticipant.run(uuidv7(), trainRentalTwoId, trainProdId, null, trainId, 'venue');
insertParticipant.run(uuidv7(), trainShowOneId, trainProdId, null, trainId, 'venue');
