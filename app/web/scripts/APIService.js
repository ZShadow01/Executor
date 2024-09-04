module.exports = {
    getUser(oauth2) {
        return new Promise((resolve, reject) => {
            fetch('https://discord.com/api/users/@me', {
                headers: {
                    authorization: `${oauth2.token_type} ${oauth2.access_token}`
                }
            })
            .then(async res => {
                resolve(await res.json());
            })
            .catch(err => {
                reject(err);
            });
        });
    },

    getAvatarUrl(userId, avatar) {
        return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`;
    }
};
