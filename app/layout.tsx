import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import StyledJsxRegistry from './registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Arrête d'être pauvre",
  description: "Grâce à cette application révolutionnaire, tu ne seras plus jamais pauvre.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="gs no-scrollbar">
      <body className={inter.className}>
        <Providers>
          <StyledJsxRegistry>{children}</StyledJsxRegistry>
        </Providers>
      </body>
    </html>
  );
}
