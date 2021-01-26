import { Ctx } from "blitz";
import db from "db";
import { GuardBuilder } from "@blitz-guard/core";
import { PrismaModelsType } from "@blitz-guard/core/src/types";

type ExtendedResourceTypes = PrismaModelsType<typeof db> | "dog";
type ExtendedAbilityTypes = "pet" | "feed" | "touch";

const Guard = GuardBuilder<ExtendedResourceTypes, ExtendedAbilityTypes>(
  async (ctx: Ctx, { can, cannot }) => {
    /*
		Your rules go here, you can start by removing access to everything
		and gradually add permissions

		eg:
		cannot("manage", "dog")

		can("pet", "dog", async (args) => { ... })
		can("walk", "dog", async (args) => { ... })
		can("feed", "dog", async (args) => (ctx.session.userId == 1) )
    */
  }
);

export default Guard;
