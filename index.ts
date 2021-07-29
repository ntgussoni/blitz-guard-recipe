import { RecipeBuilder, paths } from "@blitzjs/installer"
import { transform as MiddlewareCodemod } from "./codemods/middleware"
import { join } from "path"
import { Transformer } from "@blitzjs/installer/dist/declarations/src/utils/transform"

const builder = RecipeBuilder()
  .setName("🛡️  Blitz Guard")
  .setDescription(
    `This recipe will install all necessary dependencies and configure Blitz Guard for immediate use.`
  )
  .setOwner("ntorres.dev@gmail.com")
  .setRepoLink("https://github.com/ntgussoni/blitz-guard")
  .addAddDependenciesStep({
    stepId: "addDeps",
    stepName: "Add npm dependencies",
    explanation: `Adding Blitz Guard dependencies`,
    packages: [{ name: "@blitz-guard/core", version: "latest" }],
  })
  .addNewFilesStep({
    stepId: "addApiRoute",
    stepName: "Add Api Route ",
    explanation: `We'll setup a query API endpoint to for you to check your rules with useQuery`,
    targetDirectory: "app/guard/queries/getAbility.ts",
    templatePath: join(__dirname, "templates", "queries", "getAbility.ts"),
    templateValues: {},
  })
  .addNewFilesStep({
    stepId: "addAbilityFile",
    stepName: "Add Ability File ",
    explanation: `One file to rule them all, this is the main file where your rules will live. Creating that for you now.`,
    targetDirectory: "app/guard/ability.ts",
    templatePath: join(__dirname, "templates", "ability.ts"),
    templateValues: {},
  })

if (paths.blitzConfig() !== "blitz.config.ts") {
  builder.addTransformFilesStep({
    stepId: "addMiddleware",
    stepName: "Add development middleware",
    explanation: `Do you wish to add the development middleware to help you detect unprotected endpoints?`,
    singleFileSearch: paths.blitzConfig(),
    transform(program) {
      return MiddlewareCodemod(program)
    },
  })
} else {
  builder.printMessage({
    successIcon: "😭",
    stepId: "oops",
    stepName: "Im so sorry :(",
    message:
      "This recipe can't edit your blitz.config.ts (yet), you can add the Blitz Guard middleware following these two steps: https://ntgussoni.github.io/blitz-guard/docs/middleware",
  })
}

export default builder.build()
