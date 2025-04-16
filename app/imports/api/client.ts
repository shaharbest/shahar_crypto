import { createClient } from "meteor-rpc";
import type { ApiModule } from "../../server/api/module";

export const client = createClient<ApiModule>();
