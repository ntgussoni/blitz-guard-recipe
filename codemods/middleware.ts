// transforms/implicit-icons-to-explicit-imports.ts
import { Transform } from "jscodeshift"
import { Collection } from "jscodeshift/src/Collection"
import j from "jscodeshift"
/*
Adds BlitzGuardMiddleware to blitz.config.js
*/

export const transform = (root: Collection<j.Program>): Collection<j.Program> => {
  const alreadyImported = root.find(j.VariableDeclaration, {
    declarations: [
      {
        type: "VariableDeclarator",
        init: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "require",
          },
          arguments: [{ value: "@blitz-guard/core/dist/middleware" }],
        },
      },
    ],
  })

  if (alreadyImported.length > 0) {
    return root
  }

  root
    .get()
    .node.program.body.unshift(
      `const { BlitzGuardMiddleware } = require("@blitz-guard/core/dist/middleware");`
    )

  root
    .find(j.AssignmentExpression, {
      operator: "=",
      left: {
        object: { name: "module" },
        property: { name: "exports" },
      },
    })
    .find(j.Property, { key: { name: "middleware" } })
    .find(j.ArrayExpression)
    .replaceWith(({ node }) => {
      node.elements.push(
        j.template
          .expression`BlitzGuardMiddleware({excluded: ["/api/auth/mutations/login", "/api/auth/mutations/logout"]})`
      )
      return node
    })

  return root
}

const Program: Transform = (file, api) => {
  const root = j(file.source)
  return transform(root).toSource()
}

export default Program
