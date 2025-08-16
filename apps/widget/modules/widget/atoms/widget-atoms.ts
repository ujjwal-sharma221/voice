import { atom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";

import { WidgetScreen } from "../types";
import { CONTACT_SESSION_KEY } from "../constants";
import { Id } from "@workspace/backend/_generated/dataModel";

export const screenAtom = atom<WidgetScreen>("loading");
export const errorMessageAtom = atom<string | null>(null);
export const organizationIdAtom = atom<string | null>(null);
export const loadingMessageAtom = atom<string | null>(null);
export const conversationIdAtom = atom<Id<"conversations"> | null>(null);

export const contactSessionIdAtomFamily = atomFamily((organizationId: string) =>
  atomWithStorage<Id<"contactSession"> | null>(
    `${CONTACT_SESSION_KEY}_${organizationId}`,
    null,
  ),
);
