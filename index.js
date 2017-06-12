'use strict'
const wallet = require("chainbyteswallet");
const fs = require('fs')
const payroll = JSON.parse(fs.readFileSync('payroll.json', 'utf8'));
const apiCall = require('./helpers/apiCall.js');
const request = require('request')
const winston = require('winston');
const slack = require("./helpers/slack.js");

wallet.pushPayment(payroll.payee, payroll.payor).then((total) => {
    console.log("Total send ", total);
    const query = "https://blockchain.info/address/" + payroll.payor.address + "?format=json";
    apiCall.getData(query).then((results) => {
        console.log("Transaction results ", results);
        slack.showMetrics(results, total,payroll);
    }).catch((err) =>{
        winston.error(err);
    });
})

