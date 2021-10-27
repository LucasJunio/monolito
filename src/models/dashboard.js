require("dotenv").config();
const jwt = require("jsonwebtoken");
const sql = require("mssql");
const { config2 } = require("../config/settings");

async function readDashboard({ startdate, enddate }, token) {

    return new Promise(async (resolve, reject) => {
        try {

            const parts = token.split(" ");
            const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);

            const conndashboard = new sql.Connection(config2);
            conndashboard.connect().then(() => {
                var req = new sql.Request(conndashboard);

                const selectsql = `
                
                select
                CONVERT(varchar(10),CreationDate,103) data
                , case when CardType = 0 then 'Visa'
                when CardType = 1 then 'Master'
                when CardType = 2 then 'Amex'
                when CardType = 3 then 'Discover'
                else 'Elo' end as bandeira
                , OrderTotalAmount as valor
                ,CONVERT(VARCHAR(20),AVG(OrderTotalAmount) OVER (ORDER BY DATEPART(dd,CreationDate)),1) AS movel
                from CardPayments where
                clientId = '${decoded.guuid}'
                and  CONVERT(DATE,CreationDate) between '${startdate}' and '${enddate}'
                                
                `
                req.query(selectsql, async (err, recordset) => {
                    if (err) return reject({ name: "error", message: err, stack: selectsql });

                    const dados = recordset.map(record => {
                        return {
                            data: record.data,
                            valor: record.valor,
                            movel: record.movel
                        }
                    })

                    const dataArr = recordset.map((item) => {
                        return [item.bandeira, item];
                    });
                    const maparr = new Map(dataArr);
                    const flags = [...maparr.values()].map((info) => info.bandeira);

                    const objectFlags = flags.map(flag => {

                        return {
                            bandeira: flag,
                            valor: recordset.filter((recordset) => {
                                return recordset.bandeira === flag
                            }).reduce((acumulador, valorAtual) => {
                                return acumulador + valorAtual.valor;
                            }, 0)
                        }

                    })


                    const valuePeriod = objectFlags.reduce((acumulador, valorAtual) => {
                        return acumulador + valorAtual.valor;
                    }, 0)

                    const returndata = [{

                        chartMovingAverage: dados,
                        chartTransactedAmount: objectFlags,

                        valuePeriod: valuePeriod,
                        valueWay: 0.0

                    }]

                    return resolve({ name: "success", message: returndata });

                });
                conndashboard.close();
            });
        } catch (error) {
            return reject(error);
        }
    });
}

module.exports = {
    readDashboard
};

