'use strict'
let Messages = [];
const delayMessage = 5000;
const SlackWebHook = require('winston-slack-webhook').SlackWebHook, winston = require('winston');
module.exports = {
    showMetrics: (blockchaindata, total, payroll) => {
        const satChange = .001;
        const startBalance = (blockchaindata.final_balance / 100000000)
        payroll.payee.forEach((pay) => {
            Messages.push("Paying: " + pay.name);
            Messages.push("Wallet: " + "https://blockchain.info/address/" + pay.wallet)
        })
        Messages.push("Wallet Balance: " + startBalance.toFixed(8) + " " + "https://blockchain.info/address/" + payroll.payor.address);
        Messages.push("Total Paid: " + total / 100000000);
        const days = Number(startBalance) / (total / 100000000);
        console.log("Days:" + days, startBalance, total)
        if (total > 7) {
            Messages.push("Months Funded: " + (days / 30).toFixed(0) + " (" + days.toFixed(0) + "days)");
        }
        else {
            Messages.push("Warning:  Days Remaining in wallet : " + days.toFixed(0));
        }
        slackinfo = payroll.slackinfo;
        slackMessagesProcess();
    },
    messages: Messages
}
let slackinfo = '';
function slackMessagesProcess() {
    const slacklogger = new winston.Logger({
        level: 'info',
        transports: [
            new (winston.transports.Console)(),
            new SlackWebHook({
                level: 'info',
                webhookUrl: slackinfo.webhookUrl,
                channel: slackinfo.channel,
                username: slackinfo.username
            })
        ]
    });
    if (Messages.length > 0) {
        slacklogger.info(Messages.shift());
        setTimeout(slackMessagesProcess, delayMessage);
    }
}