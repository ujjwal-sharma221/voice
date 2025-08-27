import { atomWithStorage } from "jotai/utils";

import { VOICE_STATUS_FILTER_KEY } from "./constants";
import { Doc } from "@workspace/backend/_generated/dataModel";

export const statusAtomFilter = atomWithStorage<
  Doc<"conversations">["status"] | "all"
>(VOICE_STATUS_FILTER_KEY, "all");
