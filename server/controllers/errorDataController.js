const tubaDB = require('../models/tubaDB');
const errorDataController = {}

errorDataController.getAllData = async function (req, res, next) {
    const query = `SELECT * FROM services;`;

    tubaDB.query(query)
        .then(data => {
            res.locals.services = data.rows;
        })
        .then(() => {
            tubaDB.query(`SELECT * FROM error_data;`)
                .then(data => {
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
                            res.locals.connections = data.rows;
                            return next();
                        })
                })
        }).catch(err => {
            next(err);
        })
}

errorDataController.getAllServices = async function (req, res, next) {
    const query = `SELECT * FROM services;`;

    tubaDB.query(query)
        .then(data => {
            res.locals.services = data.rows;
            return next();
        })
}

errorDataController.getAllErrors = async function (req, res, next) {
    const query = `SELECT * FROM error_data;`;
    tubaDB.query(query)
        .then(data => {
            res.locals.errors = data.rows;
            return next();
        }).catch(error => {
            const errorObj = {
                log: 'error occurred in getAllErrors controller',
                message: { err: error }
            }
            return next(errorObj)
        })
}

errorDataController.getNewErrors = async function (req, res, next) {
    const err_time = req.params.err_time
    const query = `SELECT * FROM error_data WHERE err_time > ${err_time};`;

    tubaDB.query(query)
        .then(data => {
            res.locals.newErrors = data.rows;
            return next();
        })
}

errorDataController.getAllConnections = async function (req, res, next) {

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
            res.locals.connections = data.rows;
            return next();
        })
}

errorDataController.setup = async function (req, res, next) {
    try {
        if (!tubaDB) {
            res.locals.setup = 'No PSQL database found in .env';
            res.locals.code = 400;
            return next()
        }

        const queryCheck = `SELECT CASE WHEN EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_name = 'error_data'
        ) THEN 'true' ELSE 'false' END AS table_exists;`

        const queryCreate = `CREATE TABLE users (
            usr_id SERIAL PRIMARY KEY,
            usr_name VARCHAR(250) NOT NULL,
            usr_password VARCHAR(1000) NOT NULL,
            usr_email VARCHAR(500) NOT NULL
            );
            CREATE TABLE applications (
            app_id SERIAL PRIMARY KEY,
            app_usr_id INTEGER REFERENCES users (usr_id) NOT NULL,
            app_name VARCHAR(500) NOT NULL,
            app_kubernetes BOOLEAN NOT NULL
            );
            CREATE TABLE services (
            srv_id SERIAL PRIMARY KEY,
            srv_name VARCHAR(500) NOT NULL,
            srv_language VARCHAR(250),
            srv_usr_id INTEGER REFERENCES users (usr_id) NOT NULL,
            srv_app_id INTEGER REFERENCES applications (app_id) NOT NULL
            );
            CREATE TABLE error_data (
            err_id SERIAL PRIMARY KEY,
            err_app_id INTEGER REFERENCES applications (app_id) NOT NULL,
            err_srv_id INTEGER REFERENCES services (srv_id) NOT NULL,
            err_job_name VARCHAR(500) NOT NULL,
            err_time BIGINT NOT NULL,
            err_message VARCHAR(1000),
            err_type VARCHAR(250) NOT NULL,
            err_stack VARCHAR(4000) NOT NULL,
            err_file_path VARCHAR(2000),
            err_file VARCHAR(500),
            err_line_num INTEGER,
            err_module VARCHAR(500),
            err_module_function VARCHAR(500),
            err_full_text VARCHAR(2000)
            );
            CREATE TABLE service_connections (
            con_id SERIAL PRIMARY KEY,
            con_srv1 INTEGER REFERENCES services (srv_id) NOT NULL,
            con_srv2 INTEGER REFERENCES services (srv_id) NOT NULL
            );`

        const initialQuery = await tubaDB.query(queryCheck);

        const tableExists = initialQuery.rows[0].table_exists;
        if (tableExists === 'true') {
            res.locals.code = 400;
            res.locals.setup = 'Tuba database already instantiated'
            return next()
        }

        else {
            await tubaDB.query(queryCreate);
            res.locals.code = 200;
            res.locals.setup = 'Tuba database instantiated.'
            return next()
        }
        return next();
    } catch (error) {
    }
}

errorDataController.check = async (req, res, next) => {
    try {
        if (!tubaDB) {
            res.locals.exists = false;
            return next()
        }

        const queryCheck = `SELECT CASE WHEN EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_name = 'error_data'
        ) THEN 'true' ELSE 'false' END AS table_exists;`


        const initialQuery = await tubaDB.query(queryCheck);
        const tubaExists = initialQuery.rows[0].table_exists;

        if (tubaExists === 'true') {
            res.locals.exists = true;
        } else {
            res.locals.exists = false;
        }

        return next()

    } catch (error) {
        res.send(false);
        return next(error)
    }
}

module.exports = errorDataController;