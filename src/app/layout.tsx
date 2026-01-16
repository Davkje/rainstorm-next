import type { Metadata } from "next";
import { Lateef } from "next/font/google";
import Image from "next/image";
import "@/styles/globals.css";
import Link from "next/link";

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
    min-h-screen
  `}
			>
				<header className="bg-rain-800 px-4 gap-2 flex justify-between items-center">
					<Link href="/">
						<Image src="/rainstorm.png" alt="rainstorm" width={150} height={167}></Image>
					</Link>
					<nav className="flex gap-4">
						<Link href="/ideas">Ideas</Link>
						<Link href="/words">Words</Link>
						<Link href="/templates">Templates</Link>
						<Link href="/about">About</Link>
					</nav>
				</header>
				<main className="bg-rain-800 h-full p-4">{children}</main>
			</body>
		</html>
	);
}
