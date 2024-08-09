const { ButtonInteraction, Collection } = require("discord.js");
const EmbedService = require("../../services/EmbedService");
const fs = require('fs');
const path = require('path');
const errors = require('../../errors/errors');


class ButtonHandler {
    getButtons(dir) {
        this.buttons = new Collection();
        const buttonFiles = fs.readdirSync(path.join('app/bot', dir)).filter(f => f.endsWith('.js'));
        for (const file of buttonFiles) {
            const filePath = path.join(dir, file);
            const button = require.main.require(`./${filePath}`);

            this.buttons.set(button.id, button);
        }
    }

    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async handleButton(interaction) {
        const buttonArgsIndex = interaction.customId.indexOf('#');
        const buttonId = interaction.customId.substring(0, buttonArgsIndex);

        const button = this.buttons.get(buttonId);
        if (!button) {
            return await interaction.reply({
                embeds: [ EmbedService.getErrorEmbed('Failed to reply to button interaction.').toJSON() ]
            });
        }

        try {
            const args = interaction.customId.substring(buttonArgsIndex + 1).split(',');
            await button.execute(interaction, ...args);
        } catch (err) {
            let embed;

            for (const error of Object.keys(errors)) {
                if (err instanceof errors[error]) {
                    embed = EmbedService.getErrorEmbed(err.message);
                    break;
                }
            }
            
            if (!embed) {
                console.error(err);
                embed = EmbedService.getErrorEmbed();
            }

            await interaction.reply({
                embeds: [ embed.toJSON() ],
                ephemeral: true
            });
        }
    }
};


module.exports = new ButtonHandler();
