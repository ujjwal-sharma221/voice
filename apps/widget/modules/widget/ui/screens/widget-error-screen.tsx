"use client";

import { useAtomValue } from "jotai";
import { AlertTriangleIcon } from "lucide-react";

import { WidgetHeader } from "../components/widget-header";
import { errorMessageAtom } from "../../atoms/widget-atoms";
import VerticalCutReveal from "@workspace/ui/components/vertical-cut-reveal";

export function WidgetErrorScreen() {
  const errorMessage = useAtomValue(errorMessageAtom);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col font-semibold justify-between gap-y-2 px-2 py-6">
          <p className=" text-3xl ">
            <VerticalCutReveal
              splitBy="lines"
              staggerDuration={0.025}
              staggerFrom="first"
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 21,
              }}
            >
              Hi There! 👋
            </VerticalCutReveal>
          </p>

          <p className=" text-lg">
            <VerticalCutReveal
              splitBy="line"
              staggerDuration={0.025}
              staggerFrom="first"
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 21,
              }}
            >
              Let&apos;s get started
            </VerticalCutReveal>
          </p>
        </div>
      </WidgetHeader>

      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <AlertTriangleIcon className="" />
        <p className="text-sm">{errorMessage ?? "Invalid Configuration"}</p>
      </div>
    </>
  );
}
