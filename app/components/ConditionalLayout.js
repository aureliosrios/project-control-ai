"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Lista de rutas que NO deben mostrar el Navbar/Footer público
  const isPortalArea = pathname.startsWith("/portal") || pathname.startsWith("/clases-grabadas");

  if (isPortalArea) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
