class AbstractError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
};


class UserNotRegisteredError extends AbstractError {
    constructor(user) {
        super(`${user} is not registered as a player.`);
        this.user = user;
    }
};


class PlayerAlreadyRegisteredError extends AbstractError {
    constructor(user) {
        super(`${user} is already registered as a player.`);
        this.user = user;
    }
};


class PlayerNameTakenError extends AbstractError {
    constructor(playerName) {
        super(`Player name '${playerName}' is already taken.`);
        this.playerName = playerName;
    }
};


class GuildNotConfiguredError extends AbstractError {
    constructor() {
        super("The server has not been configured yet.");
    }
};


class MissingPermissionError extends AbstractError {
    constructor(permission) {
        super(`Missing Permission: ${permission}.`);
    }
}


module.exports = {
    UserNotRegisteredError,
    PlayerAlreadyRegisteredError,
    PlayerNameTakenError,
    GuildNotConfiguredError,
    MissingPermissionError
};
