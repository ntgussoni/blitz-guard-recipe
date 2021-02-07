const { BlitzGuardMiddleware } = require("@blitz-guard/core/dist/middleware")
module.exports = {
  middleware: [
    BlitzGuardMiddleware({
      excluded: [
        "/api/auth/mutations/login",
        "/api/auth/mutations/logout",
        "/api/guard/queries/getAbility",
      ],
    }),
  ],
}
