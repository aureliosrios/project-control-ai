import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./components/ConditionalLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Project Control AI | Capacitación y consultoría",
  description: "Capacitación y consultoría en gestión de proyectos de construcción, planeamiento, presupuestos e inteligencia artificial.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
