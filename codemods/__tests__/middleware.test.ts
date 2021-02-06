import { defineTest } from "jscodeshift/dist/testUtils"

describe("add middleware", () => {
  defineTest(__dirname, "middleware", null, `middleware-do-nothing`)
  defineTest(__dirname, "middleware", null, `middleware-basic`)
  defineTest(__dirname, "middleware", null, `middleware-with-middleware`)
  defineTest(__dirname, "middleware", null, `middleware-with-comments`)
})
