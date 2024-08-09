const { ButtonInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const QueueService = require("../../services/QueueService");
const PlayerService = require("../../services/PlayerService");
const EmbedService = require("../../services/EmbedService");
const { UserNotRegisteredError } = require("../../errors/errors");


module.exports = {
    id: 'join_queue',

    /**
     * 
     * @param {ButtonInteraction} interaction 
     * @param {String} format 
     */
    async execute(interaction, format) {
        const player = PlayerService.getById(interaction.user.id);

        if (!player) {
            throw new UserNotRegisteredError(interaction.member.nickname || interaction.user.displayName);
        }

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('join_queue#' + format)
                    .setLabel('Join')
                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()
                    .setCustomId('leave_queue#' + format)
                    .setLabel('Leave')
                    .setStyle(ButtonStyle.Danger)
            )


        await interaction.update({
            embeds: [ EmbedService.getSuccessEmbed('Test').toJSON() ],
            // components: [ row ]
        });
    }
};
