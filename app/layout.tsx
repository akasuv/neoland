"use client";

import "./globals.css";
import React from "react";
import { SideMenu } from "@/components";
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
      <body className="bg-slate-900 p-4">
        {/* <div className="w-72 fixed left-4 border border-red-500"> */}
        {/*   <SideMenu /> */}
        {/* </div> */}
        <div>{children}</div>
      </body>
    </html>
  );
}
