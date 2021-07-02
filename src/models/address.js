require('dotenv').config()
const sql = require("mssql");

const { config } = require('../config/settings');

function createAddreess(querysql, callback) {

    sql.connect(config, function (err) {
        if (err) {
            callback(err, false)
            return;
        } else {
            let request = new sql.Request();            

            request.query(querysql, (err, recordset) => {
                if (err) {
                    callback(err, false)
                    return;
                };

                sql.close();
                return callback(null, true)
            });
        }
    });
}

module.exports = { createAddreess }