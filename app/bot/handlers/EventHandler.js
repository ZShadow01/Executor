const fs = require('fs');
const path = require('path');


class EventHandler {
    getEvents(client, dir) {
        const eventFiles = fs.readdirSync(path.join('app/bot', dir)).filter(f => f.endsWith('.js'));
        for (const file of eventFiles) {
            const filePath = path.join(dir, file);
            const event = require.main.require(`./${filePath}`);

            client.on(event.name, async (...args) => {
                await event.execute(client, ...args);
            });
        }
    }
};


module.exports = new EventHandler();
