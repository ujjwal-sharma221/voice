"use client";

import { useAtomValue } from "jotai";

import { screenAtom } from "../../atoms/widget-atoms";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";

interface WidgetViewProps {
  organizationId: string;
}

export function WidgetView({ organizationId }: WidgetViewProps) {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    error: <p>TODO:Error</p>,
    loading: <p>TODO:loading</p>,
    auth: <WidgetAuthScreen />,
    voice: <p>TODO:voice</p>,
    inbox: <p>TODO:inbox</p>,
    selection: <p>TODO:selections</p>,
    chat: <p>TODO:chat</p>,
    contact: <p>TODO:contact</p>,
  };

  return (
    <main className="h-screen w-full flex flex-col overflow-hidden rounded-xl border ">
      {screenComponents[screen]}
    </main>
  );
}
