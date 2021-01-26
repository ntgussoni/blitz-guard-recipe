import { RecipeBuilder } from "@blitzjs/installer";
import { join } from "path";

export default RecipeBuilder()
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

  .build();
