const { SlashCommandBuilder } = require('discord.js');
const PlayerService = require('../../services/PlayerService.js');
const EmbedService = require('../../services/EmbedService.js');
const { PlayerAlreadyRegisteredError, PlayerNameTakenError } = require('../../errors/errors.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register a new player.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription("Set the name you'll be using ingame for identification. Do NOT use fonts.")
                .setRequired(true)
                .setMaxLength(15)
        ),
    async execute(interaction) {
        // Player is already registered
        if (PlayerService.getById(interaction.user.id)) {
            throw new PlayerAlreadyRegisteredError(interaction.member.nickname || interaction.user.displayName);
        }

        const playerName = interaction.options.getString('name');

        // Player name is taken
        if (PlayerService.getByName(playerName)) {
            throw new PlayerNameTakenError(playerName);
        }

        // Register user in the player table
        PlayerService.register(interaction.user.id, playerName);
        await interaction.reply({
            embeds: [ EmbedService.getSuccessEmbed(`${interaction.member.nickname || interaction.user.displayName} successfully registered as a player '${playerName}'.`).toJSON() ]
        });
    }
};
