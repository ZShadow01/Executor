const { SlashCommandBuilder, PermissionsBitField, ChatInputCommandInteraction, ChannelType } = require('discord.js');
const GuildService = require('../../services/GuildService');


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
            throw new 
        }

        // Check if guild is setup already (reset)
        const guildConfig = GuildService.getConfig(interaction.guildId);
        if (guildConfig) {
            // Ask for reset
        }

        // Log channel
        interaction.guild.channels.create({
            name: 'ap-log',
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: interaction.guildId,
                    deny: [ PermissionsBitField.Flags.SendMessages ]
                }
            ]
        }).then(logChannel => {

        }).catch(err => {

        });

        // Ask for queue setup
        const queuesChannel = await interaction.guild.channels.create({
            name: 'ap-queues',
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: interaction.guildId,
                    deny: [ PermissionsBitField.Flags.SendMessages ]
                }
            ]
        });
    }
};
