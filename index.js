const shared = require('./lib/shared.js');
const https = require('https');

module.exports = function(sails) {
    var exec = require('./lib/exec.js');

    gladys.on('newDevice', function(newDevice) {
        var deviceType = newDevice.service;

        if (deviceType == shared.deviceType) {
            var deviceUrl = newDevice.identifier;
            var notification = {
                title : 'Motion Detection',
                icon : 'fa fa-eye',
                user : 1,
                priority : 0
            };

            sails.log.info('New motion-detection device created, reading configuration on ' + deviceUrl + '...');

            https.get(deviceUrl, (res) => {
                var statusCode = res.statusCode;

                if (statusCode == 200) {
                    notification['iconColor'] = 'bg-green';
                    notification['text'] = 'Motion device correctly created';
                } else {
                    notification['iconColor'] = 'bg-red';
                    notification['text'] = 'Motion URL is not reachable (status=' + statusCode + ')';
                }

                gladys.notification.create(notification);
            }).on('error', (e) => {
                notification['iconColor'] = 'bg-red';
                notification['text'] = 'Motion URL is not reachable (error=' + e + ')';
                gladys.notification.create(notification);
            });
        }
    });

    return {
        exec: exec
    };
};
