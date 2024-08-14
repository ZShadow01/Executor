const EmbedService = require("./EmbedService");
const GuildService = require("./GuildService");



class LoggerService {
    async log(interaction, message) {
        const config = GuildService.getConfig(interaction.guildId);
        if (!config || !config.log_channel_id) {
            return;
        }

        const channel = await interaction.guild.channels.fetch(config.log_channel_id);
        
        await channel.send({
            embeds: [
                EmbedService.getRequestedEmbed(interaction)
                    .setDescription(message)
                    .toJSON()
            ]
        });
    }
};


module.exports = new LoggerService();
