const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const EmbedService = require('../../services/EmbedService');
const QueueService = require('../../services/QueueService');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('queues')
        .setDescription('Show all queues')
        .addStringOption(option =>
            option.setName('format')
                .setDescription('The game format')
                .addChoices(
                    { name: "3v3", value: "3v3" },
                    { name: "4v4", value: "4v4" },
                    { name: "5v5", value: "5v5" },
                    { name: "6v6", value: "6v6" }
                )    
        ),

    async execute(interaction) {
        const format = interaction.options.getString('format');

        if (!format) {
            const queue = QueueService.getGlobalQueue();
            return await interaction.reply({
                embeds: [
                    EmbedService.getRequestedEmbed(interaction)
                        .setTitle('Global Queues')
                        .addFields(
                            ...Object.keys(queue).map(fmt => {
                                return {
                                    name: `${fmt} Queue`,
                                    value: `\`${queue[fmt].queue.length}/${queue[fmt].limit}\``,
                                    // inline: true
                                };
                            })
                        )
                        .toJSON()
                ]
            });
        }

        const queue = QueueService.getGlobalQueue(format);
        await interaction.reply({
            embeds: [
                EmbedService.getRequestedEmbed(interaction)
                    .setTitle(`Global Casual ${format} Queue`)
                    .setDescription(queue.map(player => player.player_name).join('\n') || "Empty Queue")
                    .toJSON()
            ],
            components: [
                new ActionRowBuilder()
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
            ]
        });
    }
}
