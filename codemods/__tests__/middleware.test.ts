import { defineSnapshotTest } from "jscodeshift/dist/testUtils"
import fs from "fs"
import { join } from "path"
import MiddlewareTransform from "../middleware"

describe("add middleware", () => {
  defineSnapshotTest(
    MiddlewareTransform,
    null,
    fs
      .readFileSync(join(__dirname, "..", "__testfixtures__/middleware-do-nothing.input.js"))
      .toString()
  )

  defineSnapshotTest(
    MiddlewareTransform,
    null,
    fs.readFileSync(join(__dirname, "..", "__testfixtures__/middleware-basic.input.js")).toString()
  )

  defineSnapshotTest(
    MiddlewareTransform,
    null,
    fs
      .readFileSync(join(__dirname, "..", "__testfixtures__/middleware-with-middleware.input.js"))
      .toString()
  )

  defineSnapshotTest(
    MiddlewareTransform,
    null,
    fs
      .readFileSync(join(__dirname, "..", "__testfixtures__/middleware-with-comments.input.js"))
      .toString()
  )

  defineSnapshotTest(
    MiddlewareTransform,
    null,
    fs
      .readFileSync(join(__dirname, "..", "__testfixtures__/middleware-real-blitz-config.input.js"))
      .toString()
  )
})
