const { Events } = require("discord.js");

module.exports = {
    name: Events.Error,

    async execute(client, err) {
        console.error(err);
    }
};
