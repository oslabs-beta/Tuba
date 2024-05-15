const express = require('express');
const router = express.Router();

const { getAllData, getAllServices, getAllErrors, getAllConnections, getNewErrors } = require('../controllers/errorDataController');

router.use('/allData', getAllData, (req, res) => {
    res.json({
        services: res.locals.services,
        errors: res.locals.errors,
        connections: res.locals.connections
    });
})

router.use('/allErrors', getAllErrors, (req, res) => {
    res.json({errors: res.locals.errors});
})

router.use('/newErrors/:err_time', getNewErrors, (req, res) => {
    res.json({newErrors: res.locals.newErrors});
})

router.use('/allServices', getAllServices, (req, res) => {
    res.json({services: res.locals.services});
})

router.use('/allConnections', getAllConnections, (req, res) => {
    res.json({connections: res.locals.connections});
})




module.exports = router