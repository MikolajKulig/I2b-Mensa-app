import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Mensa App",
  description: "Eine App für die Mensa des BZZ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        {children}
      </body>
    </html>
  );
}
