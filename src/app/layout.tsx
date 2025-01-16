import type { Metadata } from "next";
import { Kantumruy_Pro } from "next/font/google";
import "./globals.css";
import React from "react";

const kantumruyPro = Kantumruy_Pro({
    subsets: ["latin"],
    variable: "--font-kantumruy-pro",
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${kantumruyPro.variable}`}>
        <body className="bg-dashboard mx-auto w-full h-screen flex justify-center items-center">
        {/* Main layout structure */}
        {children}
        </body>
        </html>
    );
}