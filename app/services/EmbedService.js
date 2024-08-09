const { EmbedBuilder, Colors } = require('discord.js');
const formatDate = require('../utils/formatDate.js');


class EmbedService {
    getErrorEmbed(message) {
        return new EmbedBuilder()
            .setTitle(message || "An unexpected error occurred.")
            .setColor(Colors.Red);
    }

    getSuccessEmbed(message) {
        return new EmbedBuilder()
            .setTitle(message || "Successfully executed the command.")
            .setColor(Colors.Green);
    }

    getRequestedEmbed(interaction) {
        return new EmbedBuilder()
            .setFooter({ text: `Requested by ${interaction.member.nickname || interaction.user.displayName} at ${formatDate(new Date())}`, iconURL: interaction.user.displayAvatarURL() });
    }
};


module.exports = new EmbedService();
