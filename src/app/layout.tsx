import type { Metadata } from "next";
import { Lateef } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Image from "next/image";

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
			<meta name="apple-mobile-web-app-title" content="Rainstorm" />
			<body
				className={`
				${lateef.variable} antialiased min-h-dvh w-full grid`}
			>
				{/* BACKGROUND LAYER */}
				<div className="relative col-start-1 row-start-1 w-full h-screen overflow-hidden">
					<Image
						src="/image7.svg"
						alt="background"
						fill
						className="object-cover opacity-8 mix-blend-color-dodge"
						priority
					/>

					{/* GRADIENT OVERLAY */}
					<div className="absolute inset-0 bg-linear-to-b from-transparent to-rain-800" />
				</div>

				{/* APP / CONTENT LAYER */}
				<div className="relative col-start-1 row-start-1 min-h-dvh grid grid-rows-[44px_1fr]">
					<Header />
					<main className="relative">{children}</main>
					{/* <main className="relative bg-main">{children}</main> */}
				</div>
			</body>
		</html>
	);
}
