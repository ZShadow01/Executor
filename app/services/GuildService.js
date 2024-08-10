const db = require('../database/db');


function formatSql(columns) {
    const text = columns.map(col => col + ' = ?');
    return text.join(', ');
}


class GuildService {
    addConfig(config) {
        const columns = Object.keys(config);
        
        if (columns.length === 0) return;

        db.prepare(`INSERT INTO guilds (${columns.join(', ')}) VALUES (${columns.map(_ => '?').join(', ')})`)
            .run(...columns.map(col => columns[col]));
    }

    getConfig(guildId) {
        return db.prepare("SELECT * FROM guilds WHERE guild_id = ?").get(guildId);
    }
};


module.exports = new GuildService();
