const config = require('../config.env.js');
const { getToken } = require('./generateTokenController.js');

async function getAllModes() {

    try {

        config.NODE_TLS_REJECT_UNAUTHORIZED=0;

        const token = await getToken(); 

        const response = await fetch(config.API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error:', response.status);
            throw new Error('Request failed');
        }

        return await responseData;

    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

module.exports = { getAllModes };
