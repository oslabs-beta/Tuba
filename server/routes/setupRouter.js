const express = require('express');
const router = express.Router();

const { setup, check } = require('../controllers/errorDataController');

router.get('/check', check, (req, res) => {
    res.send(res.locals.exists)
})

router.get('/', setup, (req, res) => {
    res.status(res.locals.code).json(res.locals.setup)
})

module.exports = router;