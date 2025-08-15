"use client";

import { Globe2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { useAction, useMutation } from "convex/react";

import {
  screenAtom,
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  contactSessionIdAtomFamily,
} from "../../atoms/widget-atoms";
import { api } from "@workspace/backend/_generated/api";
import { WidgetHeader } from "../components/widget-header";
import VerticalCutReveal from "@workspace/ui/components/vertical-cut-reveal";

type InitStep = "org" | "session" | "settings" | "vapi" | "done";

export function WidgetLoadingScreen({
  organizationId,
}: {
  organizationId: string | null;
}) {
  const setScreen = useSetAtom(screenAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const loadingMessage = useAtomValue(loadingMessageAtom);
  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const setOrganizationId = useSetAtom(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId as string),
  );

  const [step, setStep] = useState<InitStep>("org");
  const [sessionValid, setSessionValid] = useState(false);

  const validateOrganization = useAction(api.public.organizations.validate);
  const validateContactSession = useMutation(
    api.public.contactSessions.validate,
  );

  // validate organization
  useEffect(() => {
    if (step !== "org") return;

    setLoadingMessage("Loading Organization Information");

    if (!organizationId) {
      setErrorMessage("Organization Id is required");
      setScreen("error");
      return;
    }

    setLoadingMessage("Verifying Organization Information");

    validateOrganization({ organizationId })
      .then((res) => {
        if (res.valid) {
          setOrganizationId(organizationId);
          setStep("session");
        } else {
          setErrorMessage(res.cause ?? "Invalid Configuration");
          setScreen("error");
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Unable to verify Organization");
        setScreen("error");
      });
  }, [
    step,
    setStep,
    setScreen,
    organizationId,
    setErrorMessage,
    setLoadingMessage,
    setOrganizationId,
    validateOrganization,
  ]);

  // validate session

  useEffect(() => {
    if (step !== "session") return;

    setLoadingMessage("loading Session Information");

    if (!contactSessionId) {
      setSessionValid(false);
      setStep("done");
      return;
    }

    setLoadingMessage("validating Session Information");

    validateContactSession({
      contactSessionId: contactSessionId,
    })
      .then((res) => {
        setSessionValid(res.valid);
        setStep("done");
      })
      .catch((error) => {
        console.error(error);
        setSessionValid(false);
        setStep("settings");
      });
  }, [
    step,
    setStep,
    contactSessionId,
    setSessionValid,
    setLoadingMessage,
    validateContactSession,
  ]);

  useEffect(() => {
    if (step !== "done") return;

    const isValidSession = contactSessionId && validateContactSession;
    setScreen(isValidSession ? "selection" : "auth");
  }, [
    step,
    setStep,
    contactSessionId,
    setSessionValid,
    setLoadingMessage,
    validateContactSession,
  ]);

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
        <Globe2Icon className="animate-pulse" />
        <p className="text-sm">{loadingMessage ?? "loading..."}</p>
      </div>
    </>
  );
}
