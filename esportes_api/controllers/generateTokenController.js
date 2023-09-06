const config = require('../config.env.js');

async function getToken() {

    try {

        config.NODE_TLS_REJECT_UNAUTHORIZED=0;

        const response = await fetch(config.AUTH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: config.GRANT_TYPE,
                client_id: config.CLIENT_ID,
                client_secret: config.CLIENT_SECRET,
                username: config.USERNAME,
                password: config.PASSWORD
            })
        });

        if (!response.ok) {
            console.log('Access token unavailable.');
            return null;
        }

        const responseBody = await response.json();
        const accessToken = await responseBody.access_token;
        return accessToken;

    } catch (error) {
        console.error('Error on get the token:', error);
        return null;
    }
}

module.exports = { getToken };