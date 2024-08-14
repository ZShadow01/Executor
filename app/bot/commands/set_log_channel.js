const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');
const GuildService = require('../../services/GuildService');
const EmbedService = require('../../services/EmbedService');
const LoggerService = require('../../services/LoggerService');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('set_log_channel')
        .setDescription('Set a new channel to log activities.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('New log channel')
                .setRequired(true)
        ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');

        GuildService.updateConfig(interaction.guildId, {
            log_channel_id: channel.id
        });

        await LoggerService.log(interaction, "New log channel");

        await interaction.reply({
            embeds: [ EmbedService.getSuccessEmbed(`Successfully set log channel to <#${channel.id}>`).toJSON() ]
        });
    }
};
