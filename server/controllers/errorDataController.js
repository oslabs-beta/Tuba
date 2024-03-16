const tubaDB = require('../models/tubaDB');


const errorDataController = {}

errorDataController.getAllData = async function(req, res, next) {
    const query = `SELECT * FROM services;`;

    tubaDB.query(query)
    .then(data => {
        // console.log(data.rows);

        res.locals.services = data.rows;

    })
    .then(() => {
        tubaDB.query(`SELECT * FROM error_data;`)
        .then(data => {
            // console.log(data.rows);
            
            res.locals.errors = data.rows;

        })
        .then(() => {
            tubaDB.query(`SELECT 
            s1.srv_name AS con_srv1_name,
            s2.srv_name AS con_srv2_name,
            con_id,
            con_srv1,
            con_srv2
            FROM service_connections
            INNER JOIN services s1
            ON s1.srv_id = con_srv1
            INNER JOIN services s2
            ON s2.srv_id = con_srv2`)
            .then(data => {
                console.log(data.rows)
                res.locals.connections = data.rows;
                return next();
            })
        })
    }).catch(err => {
        next(err);
    })
}

errorDataController.getAllServices = async function(req, res, next) {
    const query = `SELECT * FROM services;`;

    tubaDB.query(query)
    .then(data => {
        // console.log(data.rows);

        res.locals.services = data.rows;
        return next();
    })
}


errorDataController.getAllErrors = async function(req, res, next) {
    const query = `SELECT * FROM error_data;`;

    tubaDB.query(query)
    .then(data => {
        console.log('', data.rows);

        res.locals.errors = data.rows;
        return next();
    }).catch(error => {
        const errorObj = {
            log: 'error occurred in getAllErrors controller',
            message: {err: error}
        }
        return next(errorObj)
    })
}


errorDataController.getNewErrors = async function(req, res, next) {

    const err_time = req.params.err_time
    const query = `SELECT * FROM error_data WHERE err_time > ${err_time};`;

    tubaDB.query(query)
    .then(data => {
        // console.log(data.rows);

        res.locals.newErrors = data.rows;
        return next();
    })
}


errorDataController.getAllConnections = async function(req, res, next) {
    const query = `SELECT 
    s1.srv_name AS con_srv1_name,
    s2.srv_name AS con_srv2_name,
    con_id,
    con_srv1,
    con_srv2
    FROM service_connections
    INNER JOIN services s1
    ON s1.srv_id = con_srv1
    INNER JOIN services s2
    ON s2.srv_id = con_srv2`;

    tubaDB.query(query)
    .then(data => {
        // console.log(data.rows);

        res.locals.connections = data.rows;
        return next();
    })
}



module.exports = errorDataController;