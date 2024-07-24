const { Console } = require('console');

const fs = require('fs').promises;

const orderLogs = async (req, res, next) => {
  try {
    const logMessage = `Order request: user:${req.body.user} totalAmount: ${req.body.totalAmount} Date: ${new Date().toISOString()} - method: ${req.method} url: ${req.url}\n`;
    await fs.appendFile('./logs/order.txt', logMessage);
    next();
  } catch (error) {
    console.log(error.message, "Error while writing the logs");
  }
};

module.exports = orderLogs;
