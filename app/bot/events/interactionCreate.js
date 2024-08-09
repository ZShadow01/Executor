const { Events } = require('discord.js');


module.exports = {
    name: Events.InteractionCreate,
    
    async execute(client, interaction) {
        if (interaction.isChatInputCommand()) {
            await client.commandHandler.handleCommand(interaction);
        }

        else if (interaction.isButton()) {
            await client.buttonHandler.handleButton(interaction);
        }
    }
};
