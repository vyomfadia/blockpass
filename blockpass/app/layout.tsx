import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
import AuthSessionWrapper from "@/app/(context)/AuthSessionProvider";
import { PolkadotExtensionContextProvider } from "@/app/(context)/PolkadotExtensionContext";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
    title: "BlockPass",
    description: "Get tickets for a fair price",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <AuthSessionWrapper>
            <PolkadotExtensionContextProvider>
                <html lang="en">
                    <body className={`${nunito.className} h-[100svh] relative`}>
                        <div className="absolute overlay h-full w-full overflow-hidden"> 
                            <svg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'>
                                <filter id='noiseFilter'>
                                    <feTurbulence 
                                    type='fractalNoise' 
                                    baseFrequency='9.11' 
                                    numOctaves='6' 
                                    stitchTiles='stitch'/>
                                </filter>
                                
                                <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
                            </svg>
                        </div>
                        <div className="absolute gradient h-full w-full">
                        </div>
                        <div className="h-full relative">
                            {children}
                        </div>
                    </body>
                </html>
            </PolkadotExtensionContextProvider>
        </AuthSessionWrapper>
    );
}
