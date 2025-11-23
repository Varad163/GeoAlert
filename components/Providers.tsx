"use client";

import { SessionProvider, useSession } from "next-auth/react";
import Header from "./Header";

function ContentWrapper({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <>
      <Header />
      <div className={isAuthenticated ? "pt-16" : ""}>
        {children}
      </div>
    </>
  );
}

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ContentWrapper>{children}</ContentWrapper>
    </SessionProvider>
  );
}

