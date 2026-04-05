import type { Metadata } from "next";
import { Epilogue, Manrope } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const epilogue = Epilogue({ 
  variable: "--font-epilogue",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard - AgendaWeb",
  description: "Painel de Gestão para Barbearias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${epilogue.variable} ${manrope.variable} antialiased bg-surface text-on-surface flex h-screen overflow-hidden selection:bg-primary/30`}
      >
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
