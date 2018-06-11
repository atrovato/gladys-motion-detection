const noble = require('noble');
const shared = require('./shared.js');
const scanner = require('./scanner.js');

module.exports = function(deviceInfo) {
    return new Promise((resolve, reject) => {
        reject(deviceInfo);
    });
};
