"use client";

import { useAtomValue } from "jotai";

import { screenAtom } from "../../atoms/widget-atoms";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { WidgetChatScreen } from "../screens/widget-chat-screen";
import { WidgetErrorScreen } from "../screens/widget-error-screen";
import { WidgetLoadingScreen } from "../screens/widget-loading-screen";
import { WidgetSelectionScreen } from "../screens/widget-selection-screen";

interface WidgetViewProps {
  organizationId: string | null;
}

export function WidgetView({ organizationId }: WidgetViewProps) {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    error: <WidgetErrorScreen />,
    loading: <WidgetLoadingScreen organizationId={organizationId} />,
    auth: <WidgetAuthScreen />,
    voice: <p>TODO:voice</p>,
    inbox: <p>TODO:inbox</p>,
    selection: <WidgetSelectionScreen />,
    chat: <WidgetChatScreen />,
    contact: <p>TODO:contact</p>,
  };

  return (
    <main className="h-screen w-full flex flex-col overflow-hidden rounded-xl border ">
      {screenComponents[screen]}
    </main>
  );
}
