import { Inter } from 'next/font/google';
import '../globals.css';
const inter = Inter({ subsets: ['latin'] });

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
