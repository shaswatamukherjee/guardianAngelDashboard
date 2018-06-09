const proxyPort = 48184;
const ftServer = require('./serviceProxyServer')(proxyPort);
ftServer.server.listen(process.env.PORT || proxyPort);