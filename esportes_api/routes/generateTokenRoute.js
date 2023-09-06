const { Router } = require('express');
const express = require('express');
const router = Router();
const Token = require('../controllers/generateTokenController.js');
const cors = require('cors');

const app = express();

app.use(cors());

router
    .get('/auth/token', async (req, res) => {
        res.status(200).json(await Token.getToken());
    })

module.exports = router;