import { OrganizationList } from "@clerk/nextjs";

export function OrganizationSelectView() {
  return (
    <OrganizationList
      afterCreateOrganizationUrl="/"
      afterSelectOrganizationUrl="/"
      hidePersonal
      skipInvitationScreen
    />
  );
}
