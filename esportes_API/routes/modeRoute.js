const { Router } = require('express');
const express = require('express');
const router = Router();
const Modes = require('../controllers/modeController.js');
const cors = require('cors');

const app = express();

app.use(cors());

router
    .get('/esportes', async (req, res) => {
        res.status(200).json(await Modes.getAllModes());
    })

module.exports = router;