const Database = require('better-sqlite3');
const path = require('path');

require('dotenv').config();

const dbPath = path.join(__dirname, process.env.DATABASE);
const db = new Database(dbPath, { verbose: console.log });
db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS players (
    player_id TEXT PRIMARY KEY,
    player_name TEXT UNIQUE NOT NULL,
    registered_at TEXT NOT NULL,
    elo INTEGER
);

CREATE TABLE IF NOT EXISTS guilds (
    guild_id TEXT PRIMARY KEY,
    log_channel_id TEXT,
    global_3v3_channel_id TEXT,
    global_3v3_message_id TEXT,
    global_4v4_channel_id TEXT,
    global_4v4_message_id TEXT,
    global_5v5_channel_id TEXT,
    global_5v5_message_id TEXT,
    global_6v6_channel_id TEXT,
    global_6v6_message_id TEXT
);

CREATE TABLE IF NOT EXISTS queue_messages (
    message_id TEXT,
    channel_id TEXT,
    format TEXT,
    mode BOOLEAN
);
`);


module.exports = db;
