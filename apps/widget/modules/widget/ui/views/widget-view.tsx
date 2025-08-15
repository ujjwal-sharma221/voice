"use client";

import { WidgetAuthScreen } from "../screens/widget-auth-screen";

interface WidgetViewProps {
  organizationId: string;
}

export function WidgetView({ organizationId }: WidgetViewProps) {
  return (
    <main className="h-screen w-full flex flex-col overflow-hidden rounded-xl border ">
      <WidgetAuthScreen />
    </main>
  );
}
