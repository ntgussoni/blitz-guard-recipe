// transforms/implicit-icons-to-explicit-imports.ts
import { Collection } from "jscodeshift/src/Collection"
import j from "jscodeshift"
import { customTsParser } from "@blitzjs/installer"
import { Transformer } from "@blitzjs/installer/dist/declarations/src/utils/transform"
/*
Adds BlitzGuardMiddleware to blitz.config.js
*/

export const transform: Transformer = (program) => {
  const alreadyImported = program.find(j.VariableDeclaration, {
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
    return program
  }

  program
    .get()
    .node.program.body.unshift(
      `const { BlitzGuardMiddleware } = require("@blitz-guard/core/dist/middleware");`
    )
  program
    .find(j.AssignmentExpression, {
      operator: "=",
      left: {
        object: { name: "module" },
        property: { name: "exports" },
      },
    })
    .find(j.ObjectProperty, { key: { name: "middleware" } })
    .find(j.ArrayExpression)
    .replaceWith(({ node }) => {
      node.elements.push(
        j.template
          .expression`BlitzGuardMiddleware({excluded: ["/api/auth/mutations/login", "/api/auth/mutations/logout", "/api/guard/queries/getAbility"]})`
      )
      return node
    })

  return program
}

const Program = (file) => {
  const root = j(file.source, { parser: customTsParser })
  return (transform(root) as Collection<j.Program>).toSource()
}

export default Program
