import type { Metadata } from "next";
import { Lateef } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Background from "@/components/ui/Background";

// FONT
const lateef = Lateef({
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	style: ["normal"],
	variable: "--font-lateef",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Rainstorm",
	description: "The one word, creative writing ideation tool",
	openGraph: {
		title: "Rainstorm",
		description: "The one word, creative writing ideation tool",
		url: "https://rainstorm-project.vercel.app/",
		siteName: "Rainstorm",
		images: [
			{
				url: "/images/og-image.png",
				width: 1200,
				height: 630,
				alt: "Rainstorm - Creative ideation tool",
			},
		],
		locale: "en_US",
		type: "website",
	},
	manifest: "/webmanifest",
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-icon.png",
	},
	appleWebApp: {
		title: "Rainstorm",
	},
	metadataBase: new URL("https://rainstorm.app"),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			{/* <meta name="apple-mobile-web-app-title" content="Rainstorm" /> */}
			<body
				className={`
				${lateef.variable} antialiased min-h-dvh w-full grid`}
			>
				{/* BACKGROUND LAYER */}
				<Background />

				{/* APP / CONTENT LAYER */}
				<div className="relative col-start-1 row-start-1 min-h-dvh grid grid-rows-[44px_1fr]">
					<Header />
					<main className="relative">{children}</main>
				</div>
			</body>
		</html>
	);
}
