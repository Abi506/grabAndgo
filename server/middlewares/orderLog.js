const { Console } = require('console');

const fs = require('fs').promises;

const orderLogs = async (req, res, next) => {
  try {
    const logMessage = `Order request: user:${req.body.user} totalAmount: ${req.body.totalAmount} Date: ${new Date().toISOString()} - method: ${req.method} url: ${req.url}\n`;
    const existingLogs = await fs.readFile('./logs/order.txt', 'utf8');
    const updatedLogs = `${logMessage}${existingLogs}`;
    await fs.writeFile('./logs/order.txt', updatedLogs);
    next();
  } catch (error) {
    console.log(error.message, "Error while writing the logs");
  }
};

module.exports = orderLogs;