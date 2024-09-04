require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');

const { getUser, getAvatarUrl } = require('./scripts/APIService');

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res) => {
    const oauth2 = req.session.oauth2;

    const options = {
        user: null
    };
    
    if (oauth2) {
        const user = await getUser(oauth2);
        
        options.user = {
            username: user.username,
            avatarUrl: getAvatarUrl(user.id, user.avatar)
        };
    }

    res.render('index', options);
});


app.get('/dashboard', async (req, res) => {
    const oauth2 = req.session.oauth2;

    const options = {
        user: null
    };
    
    if (oauth2) {
        const user = await getUser(oauth2);
        
        options.user = {
            username: user.username,
            avatarUrl: getAvatarUrl(user.id, user.avatar)
        };
    }

    res.render('dashboard', options);
});


app.get('/logout', async (req, res) => {
    req.session.destroy();

    res.redirect('/');
});


app.get('/auth/callback', async (req, res) => {
    // Get code
    const code = req.query.code;

    const body = new URLSearchParams({
        "client_id": process.env.CLIENT_ID,
        "client_secret": process.env.CLIENT_SECRET,
        "grant_type": "authorization_code",
        "code": code.toString(),
        "redirect_uri": `http://localhost:${process.env.PORT}/auth/callback`
    });

    try {
        const response = await fetch("https://discord.com/api/oauth2/token", {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        req.session.oauth2 = await response.json();

        // const guilds = await fetch('https://discord.com/api/users/@me/guilds', {
        //     headers: {
        //         authorization: `${tokenType} ${accessToken}`
        //     }
        // });

        // console.log(await userInfo.json());
        // console.log(await guilds.json());

        return res.redirect('/dashboard');
    } catch (err) {
        return res.redirect('/error');
    }
});


app.listen(process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT);
});
