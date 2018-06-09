const restify = require('restify');
const server = restify.createServer({
    name: 'stubserver'
});
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.put('/authenticate', function (req, res, next) {
    res.send(require('../responses/authenticate/authenticate.json'));
    res.status(200);
    return next();
});
server.get('/getCalendarOverview/:employeeid', function (req, res, next) {
    res.send(require('../responses/getLeaveDetails/getLeaveDetails.json'));
    res.status(200);
    return next();
});
server.get('/getTimesheetOverview/:employeeid', function (req, res, next) {
    res.send(require('../responses/getTimesheetOverview/getTimesheetOverview.json'));
    res.status(200);
    return next();
});

server.get('/getLeaveHistory/:employeeid', function (req, res, next) {
    res.send(require('../responses/getLeaveHistory/getLeaveHistory.json'));
    res.status(200);
    return next();
});

server.get('/getLeaveRequestsForApproval/:employeeid', function (req, res, next) {
    res.send(require('../responses/getLeaveRequestsForApproval/getLeaveRequestsForApproval.json'));
    res.status(200);
    return next();
});

server.get('/getLeaveCredits/:employeeid', function (req, res, next) {
    res.send(require('../responses/getLeaveList/getLeaveList.json'));
    res.status(200);
    return next();
});

server.get('/getLeaveDetailsForApprover/:employeeid', function (req, res, next) {
    res.send(require('./getLeaveDetailsForApprover.json'));
    res.status(200);
    return next();
});

server.get('/getMyLeaveDetails/:requestId', function (req, res, next) {
    res.send(require('./getLeaveDetailsForApprover.json'));
    res.status(200);
    return next();
});

server.get('/getLeaveRequestDetails', function (req, res, next) {
    res.send(require('../responses/getLeaveRequestDetails/getLeaveRequestDetails.json'));
    res.status(200);
    return next();
});

server.get('/getLeaveRequesterDetails', function (req, res, next) {
    res.send(require('../responses/getLeaveRequesterDetails/getLeaveRequesterDetails.json'));
    res.status(200);
    return next();
});

server.get('/getHolidayList/:employeeid', function (req, res, next) {
    res.send(require('../responses/getHolidayList/getHolidayList.json'));
    res.status(200);
    return next();
});

server.get('/getLeaveHistory/:employeeid', function (req, res, next) {
    res.send(require('../responses/getLeaveHistory/getLeaveHistory.json'));
    res.status(200);
    return next();
});

server.post('/applyLeave/:employeeid', function (req, res, next) {
    res.send(require('../responses/applyLeave/applyLeave.json'));
    res.status(200);
    return next();
});

server.get('/getOnboardingOptions/:employeeid', function (req, res, next) {
    res.send(require('../responses/getOnboardingOptions/getOnboardingOptions.json'));
    res.status(200);
    return next();
});

server.get('/getOnboardingDetails/:employeeid', function (req, res, next) {
    res.send(require('../responses/getOnboardingDetails/getOnboardingDetails.json'));
    res.status(200);
    return next();
});

server.get('/employeeCatalogue/:employeeid', function (req, res, next) {
    res.send(require('../responses/employeeCatalogue/employeeCatalogue.json'));
    res.status(200);
    return next();
});

server.post('/onboard', function (req, res, next) {
    res.send(require('../responses/onboard/onboard.json'));
    res.status(200);
    return next();
});

module.exports = server;