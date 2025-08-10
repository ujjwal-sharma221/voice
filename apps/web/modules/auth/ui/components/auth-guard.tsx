"use client";

import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";

import SignInView from "../views/sign-in-view";
import { AuthLayout } from "../layouts/auth-layout";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthLoading>
        <AuthLayout>
          <p>loading...</p>
        </AuthLayout>
      </AuthLoading>

      <Authenticated>{children}</Authenticated>

      <Unauthenticated>
        <AuthLayout>
          <SignInView />
        </AuthLayout>
      </Unauthenticated>
    </>
  );
}
