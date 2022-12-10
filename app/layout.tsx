"use client";

import "./globals.css";
import React from "react";
import { SideMenu } from "@/components";
import { Analytics } from "@/components";

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
