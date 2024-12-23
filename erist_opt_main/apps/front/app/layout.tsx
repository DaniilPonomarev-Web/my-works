import './global.css';
import { montserrat } from './ui/fonts';
import Favicons from './providers/HeadProvider/Favicons';
import Head from 'next/head';
import Script from 'next/script';
import { SessionProvider } from 'next-auth/react';
import { auth } from '../auth';

export const metadata = {
  title: 'erist.store ОПТ',
  description:
    'Откройте для себя выгодные условия оптовых закупок в интернет-магазине erist.store! Широкий ассортимент, лучшие цены и оперативная доставка. Присоединяйтесь к успешным партнерам уже сегодня!',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="ru" className={montserrat.className}>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1 maximum-scale=1.0"
          />
          <Favicons />
          <meta name="theme-color" content={'#ffffff'} />
          <meta name="msapplication-navbutton-color" content={'#f37021'} />
          <meta
            name="apple-mobile-web-app-status-ber-style"
            content={'#ffffff'}
          />
        </Head>
        <Favicons />
        {/* Яндекс.Метрика */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(98200305, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
            });
          `,
          }}
        />

        <body>{children}</body>
      </html>
    </SessionProvider>
  );
}
