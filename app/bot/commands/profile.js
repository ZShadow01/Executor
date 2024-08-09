const { SlashCommandBuilder } = require('discord.js');
const PlayerService = require('../../services/PlayerService');
const EmbedService = require('../../services/EmbedService');
const formatDate = require('../../utils/formatDate');
const { UserNotRegisteredError } = require('../../errors/errors');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Show the profile of a player.')
        .addUserOption(option =>
            option.setName('player')
                .setDescription('Player you want to see the profile of.')
        ),

    async execute(interaction) {
        const member = interaction.options.getMember('player') || interaction.member;
        const user = interaction.options.getUser('player') || interaction.user;

        const name = member.nickname || user.displayName;

        const player = PlayerService.getById(user.id);
        if (!player) {
            throw new UserNotRegisteredError(name);
        }

        await interaction.reply({
            embeds: [
                EmbedService.getRequestedEmbed(interaction)
                    .setTitle(`${name}'${name.toLowerCase().endsWith('s') ? '' : 's'} Profile`)
                    .setDescription(`**Player Name** ${player.player_name}`)
                    .setThumbnail(user.displayAvatarURL())
                    .addFields(
                        { name: 'User ID', value: user.id },
                        { name: 'Registered at', value: formatDate(new Date(player.registered_at)) }
                    )
                    .toJSON()
            ]
        });
    }
}
