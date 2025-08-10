"use client";

import { useOrganization } from "@clerk/nextjs";

import { AuthLayout } from "../layouts/auth-layout";
import { OrganizationSelectView } from "../views/organization-select-view";

export function OrganizationGuard({ children }: { children: React.ReactNode }) {
  const { organization } = useOrganization();
  if (!organization) {
    return (
      <AuthLayout>
        <OrganizationSelectView />
      </AuthLayout>
    );
  }

  return <>{children}</>;
}
