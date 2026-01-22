import type { Metadata } from "next";
import { Lateef } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";

const lateef = Lateef({
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	style: ["normal"],
	variable: "--font-lateef",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Rainstorm",
	description: "The one word, limiting, focused idea tool",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`
				${lateef.variable}
				antialiased
				grid
				grid-rows-[44px_auto]
				min-h-dvh
			`}
			>
				<Header />
				<main className="bg-main h-full p-4">{children}</main>
			</body>
		</html>
	);
}
