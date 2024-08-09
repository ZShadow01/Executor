const db = require('../database/db.js');


const globalQueue = {
    "3v3": {
        limit: 6,
        queue: []
    },
    "4v4": {
        limit: 8,
        queue: []
    },
    "5v5": {
        limit: 10,
        queue: []
    },
    "6v6": {
        limit: 12,
        queue: []
    }
};


class QueueService {
    getQueueMessages(format, mode) {
        return db.prepare('SELECT * FROM queue_messages WHERE format = ?, mode = ?')
            .all(format, mode === 'ranked' ? true : (mode === 'casual' ? false : null));
    }

    /**
     * Check if the player is in the global queue of any format
     * @param {Object} player 
     * @returns Format the player is in the queue of
     */
    isPlayerInGlobalQueue(player) {
        for (const format of Object.keys(globalQueue)) {
            if (globalQueue[format].queue.includes(player)) return format;
        }
        return "";
    }

    /**
     * Add a player to the global queue.
     * @param {Object} player 
     * @param {String} format 
     * @returns Match up array
     */
    addPlayerToGlobalQueue(player, format) {
        if (this.isPlayerInGlobalQueue(player)) {
            return [];
        }

        globalQueues[format].queue.push(player);

        if (globalQueue[format].queue.length >= globalQueue[format].limit) {
            const match = globalQueue[format].queue.slice(0, globalQueue[format].limit);
            globalQueue[format].queue.splice(0, globalQueue[format].limit);

            return match;
        }

        return [];
    }

    removePlayerFromGlobalQueue(player) {
        const format = this.isPlayerInGlobalQueue(player);
        if (!format) {
            return;
        }

        const index = globalQueue[format].queue.indexOf(player);
        globalQueue[format].queue.splice(index, 1);
    }

    getGlobalQueue(format) {
        if (!format) {
            return globalQueue;
        }

        return globalQueue[format].queue;
    }
};


module.exports = new QueueService();
