const { Collection, ChatInputCommandInteraction, PermissionsBitField } = require('discord.js');
const errors = require('../../errors/errors');
const fs = require('fs');
const path = require('path');
const EmbedService = require('../../services/EmbedService');
const GuildService = require('../../services/GuildService');


class CommandHandler {
    /**
     * Returns a collection of all commands within the given directory (including subdirectories)
     * @param {String} dir Path to the directory with all commands
     */
    getCommands(dir) {
        const commands = new Collection();
        const directories = [dir];
        while (directories.length > 0) {
            const currentDir = directories.shift();

            const files = fs.readdirSync(path.join('app/bot', currentDir));
            for (const file of files) {
                const filePath = path.join(currentDir, file);
                const lstat = fs.lstatSync(path.join('app/bot', filePath));

                if (lstat.isDirectory()) {
                    directories.push(filePath);
                    continue;
                }

                if (!file.endsWith('.js')) continue;

                const cmd = require.main.require(`./${filePath}`);
                if (cmd.data && cmd.execute) {
                    commands.set(cmd.data.name, cmd);
                }
            }
        }

        this.commands = commands;
        return commands;
    }

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async handleCommand(interaction) {
        const command = this.commands.get(interaction.commandName);

        if (!command) {
            return await interaction.reply({
                embeds: [ EmbedService.getErrorEmbed('Command not found.').toJSON() ]
            });
        }

        try {
            // Check if bot has permission
            if (command.permissions?.length > 0) {
                const botMember = await interaction.guild.members.fetchMe();
                const botPermissions = botMember.permissions;

                for (const perm of command.permissions) {
                    if (!botPermissions.has(perm)) {
                        throw new errors.MissingPermissionError(
                            (new PermissionsBitField(perm)).toArray().at(0)  // Convert flag to string
                        );
                    }
                }
            }

            // Check if guild is configured
            const guildConfig = GuildService.getConfig(interaction.guildId);
            console.log(guildConfig);
            if (!guildConfig && command.data.name !== 'setup') {
                throw new errors.GuildNotConfiguredError();
            }

            await command.execute(interaction);
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

            // Log to log channel

            await interaction.reply({
                embeds: [ embed.toJSON() ]
            });
        }
    }
};


module.exports = new CommandHandler();
