const { sessionMiddleware, simpleRolesIsAuthorized } = require("@blitzjs/server")
module.exports = {middleware: [sessionMiddleware({isAuthorized: simpleRolesIsAuthorized})]};
