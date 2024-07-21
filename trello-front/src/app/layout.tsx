import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { SITE_NAME } from "@/constants/seo.constants";
import "./globals.scss";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import Head from "next/head";

const zen = Noto_Sans({
    subsets: ["cyrillic", "latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
    variable: "--font-zen",
    style: ["normal"],
});

export const metadata: Metadata = {
    title: {
        default: SITE_NAME,
        template: `%s | ${SITE_NAME}`,
    },
    description: "Task planner - Task Wave",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/favicon/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon/favicon-16x16.png"
                />
                <link rel="manifest" href="/favicon/site.webmanifest" />
            </Head>
            <body className={zen.className}>
                <Providers>
                    {children}
                    <Toaster
                        theme="dark"
                        position="bottom-right"
                        duration={3000}
                        richColors
                    />
                </Providers>
            </body>
        </html>
    );
}
