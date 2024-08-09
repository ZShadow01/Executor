const { REST, Routes, Collection } = require('discord.js');


/**
 * Deploy all commands
 * @param {Collection} commands Collection of all commands to deploy
 */
module.exports = async function(commands) {
    // Deploy commands
    commands = commands.map(cmd => cmd.data.toJSON());
    
    const rest = new REST().setToken(process.env.TOKEN);

    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.TEST_GUILD_ID),
            { body: commands }
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (err) {
		console.error(err);
    }
};
