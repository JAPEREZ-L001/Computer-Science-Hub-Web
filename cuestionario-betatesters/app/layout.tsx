import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Encuesta Betatesters – Computer Science Hub",
  description:
    "Cuestionario para betatesters del Computer Science Hub. Tu feedback nos ayuda a mejorar la experiencia web.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
