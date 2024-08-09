const db = require('../database/db.js');


class PlayerService {
    /**
     * Register a new player
     * @param {String} playerId 
     * @param {String} playerName 
     */
    register(playerId, playerName) {
        db.prepare('INSERT INTO players (player_id, player_name, registered_at, elo) VALUES (?, ?, ?, ?)')
            .run(playerId, playerName, (new Date()).toISOString(), 0);
    }

    /**
     * Returns player information from the player table
     * @param {String} playerId Player ID
     * @returns {Object} Player information
     */
    getById(playerId) {
        return db.prepare('SELECT * FROM players WHERE player_id = ?').get(playerId);
    }

    getByName(playerName) {
        return db.prepare('SELECT * FROM players WHERE player_name = ?').get(playerName);
    }
};


module.exports = new PlayerService();
