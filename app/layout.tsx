"use client";

import "./globals.css";
import React from "react";
import { Analytics } from "@/components";
import posthog from "posthog-js";
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY as string, {
  api_host: "https://us.posthog.com",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    import("preline");
  }, []);
  return (
    <html>
      <head />
      <body className="bg-slate-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
