const { Permissions } = require('discord.js');

module.exports = function(bitfield) {
    return (new Permissions(bitfield)).toArray();
};
