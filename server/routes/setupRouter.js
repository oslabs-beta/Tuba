const express = require('express');
const router = express.Router();

const { setup } = require('../controllers/errorDataController');


router.use('/', setup, (req, res) => {
    res.status(200).json({})
})

module.exports = router;