const { SlashCommandBuilder, PermissionsBitField, ChatInputCommandInteraction, ChannelType } = require('discord.js');
const GuildService = require('../../services/GuildService');
const { MissingPermissionError } = require('../../errors/errors');
const EmbedService = require('../../services/EmbedService');
const LoggerService = require('../../services/LoggerService');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Setup the server automatically.')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        // Check for necessary permissions
        const botMember = await interaction.guild.members.fetchMe();
        const botPermissions = botMember.permissions;
        if (!botPermissions.has(PermissionsBitField.Flags.ManageChannels)) {
            throw new MissingPermissionError('MANAGE_CHANNEL');
        }

        // Check if guild is setup already (reset)
        const guildConfig = GuildService.getConfig(interaction.guildId);
        if (guildConfig) {
            // Ask for reset
        }

        // Log channel
        const logChannel = await interaction.guild.channels.create({
            name: 'ap-log',
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: interaction.guildId,
                    deny: [ PermissionsBitField.Flags.SendMessages ]
                },
                {
                    id: interaction.client.user.id,
                    allow: [ PermissionsBitField.Flags.SendMessages ]
                }
            ]
        });

        // Ask for queue setup
        const queuesChannel = interaction.guild.channels.create({
            name: 'ap-queues',
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: interaction.guildId,
                    deny: [ PermissionsBitField.Flags.SendMessages ]
                }
            ]
        });

        // Send queues as embeds

        // Configuration
        const config = {
            guild_id: interaction.guildId,
            log_channel_id: logChannel.id
        };

        GuildService.addConfig(config);

        // Log
        await LoggerService.log(interaction, "New log channel");
    }
};
