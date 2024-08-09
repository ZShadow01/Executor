const db = require('../database/db.js');

const { Client, GatewayIntentBits } = require('discord.js');
const deployCommands = require('./deployCommands.js');
require('dotenv').config();


// Setup client and all handlers
const intents = [ GatewayIntentBits.Guilds ];

const client = new Client({ intents: intents });
client.commandHandler = require('./handlers/CommandHandler.js');
client.commandHandler.getCommands('commands');

client.eventHandler = require('./handlers/EventHandler.js');
client.eventHandler.getEvents(client, 'events');

client.buttonHandler = require('./handlers/ButtonHandler.js');
client.buttonHandler.getButtons('buttons');


(async function() {
    await deployCommands(client.commandHandler.commands);

    // Start bot
    client.login(process.env.TOKEN);
})();
