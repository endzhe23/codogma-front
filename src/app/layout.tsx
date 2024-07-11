import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';
import {ThemeProvider} from '@mui/material/styles';
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import theme from '../theme';
import "./globals.css";
import {NavBar} from "@/components/NavBar";
import NavTabs from "@/components/NavTabs";

const inter = Inter({subsets: ["latin"]});

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
        <html lang="en">
        <body className={inter.className}>
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <NavBar/>
                <NavTabs/>
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}