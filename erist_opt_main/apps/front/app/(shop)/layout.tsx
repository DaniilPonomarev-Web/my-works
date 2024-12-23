import { Toaster } from '@erist-opt/shadcn/components/ui/toaster';

import '../global.css';
import { montserrat } from '../ui/fonts';
import Footer from '../ui/footer/footer';
import Header from '../ui/header';
import Sidebar from '../ui/sidebar/sidebar';
import { auth } from '../../auth';
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: 'erist.store ОПТ',
  description:
    'Откройте для себя выгодные условия оптовых закупок в интернет-магазине erist.store! Широкий ассортимент, лучшие цены и оперативная доставка. Присоединяйтесь к успешным партнерам уже сегодня!',
};

export default async function ShoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="ru" className={montserrat.className}>
      <body>
        <Header>
          <Sidebar />
        </Header>
        <SessionProvider session={session}> {children}</SessionProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
