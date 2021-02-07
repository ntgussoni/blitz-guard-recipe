const { BlitzGuardMiddleware } = require("@blitz-guard/core/dist/middleware");
const { sessionMiddleware, simpleRolesIsAuthorized } = require("@blitzjs/server")
module.exports = {middleware: [
  sessionMiddleware({isAuthorized: simpleRolesIsAuthorized}),
  BlitzGuardMiddleware({excluded: ["/api/auth/mutations/login", "/api/auth/mutations/logout"]})
]};


