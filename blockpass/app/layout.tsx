import type { Metadata } from "next";
import { Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";
import AuthSessionWrapper from "@/context/AuthSessionProvider";
import { PolkadotExtensionContextProvider } from "@/context/PolkadotExtensionContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <AuthSessionWrapper>
            <PolkadotExtensionContextProvider>
                <html lang="en">
                <body className={`${inter.className} h-screen w-screen`}>{children}</body>
                </html>
            </PolkadotExtensionContextProvider>
        </AuthSessionWrapper>
    );
}
