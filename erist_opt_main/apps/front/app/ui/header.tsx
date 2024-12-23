'use client';

import Link from 'next/link';
import React, { Suspense, useEffect, useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

import SvgMainLogo from '../ui/Icons/MainLogo';
import SvgCart from '../ui/Icons/Cart';
import SvgAccountIcon from '../ui/Icons/AccountIcon';
import Card from './card/card';
import SearchComponent from './search/SearchComponent';
import { SideBarSkeleton } from './skeletons';
import { getCart } from '../lib/actions';
import { useAtom } from 'jotai';
import { QuantityCart } from '../lib/store/cart.store';
import { useSession } from 'next-auth/react';

export default function Header({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession(); // Получаем данные сессии
  const isAuthenticated = !!session?.user; // Проверяем, авторизован ли пользователь

  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [, setCart] = useState<any>();
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setQuantity] = useAtom(QuantityCart);

  const handleOpenCard = () => {
    setIsCardOpen(true);
  };

  const handleCloseCard = () => {
    setIsCardOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    const fetcher = async () => {
      const cart = await getCart();
      if (cart?.items.length) {
        const quantity = cart.items.reduce(
          (quantity, item) => (quantity += item.quantity),
          0
        );
        setQuantity(quantity);
      }

      setCart(cart);
    };
    fetcher();
  }, [setQuantity]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isSearchOpen]);

  return (
    <header
      className={`bg-white w-full mx-auto transition-all duration-300 items-center ${
        isScrolled ? 'fixed top-0 left-0 right-0 z-10 md:static' : ''
      }`}
    >
      <div className="header flex justify-start items-left p-4 md:p-6">
        <div className="order-1 md:order-2 flex items-center space-x-4 ml-0 md:ml-12">
          <Suspense key="side-bar" fallback={<SideBarSkeleton />}>
            {children}
          </Suspense>
        </div>

        {/* Main Logo */}
        <Link
          href="/home"
          className="order-2 md:order-1 flex items-center ml-auto md:ml-0 "
        >
          <SvgMainLogo />
        </Link>

        <div className="order-3 flex items-center space-x-4 ml-auto">
          {!isSearchOpen && (
            <MagnifyingGlassIcon
              width={24}
              className="cursor-pointer"
              onClick={toggleSearch}
            />
          )}
          {isSearchOpen && (
            <XMarkIcon
              width={24}
              className="cursor-pointer"
              onClick={toggleSearch}
            />
          )}
          <Link href="/lk" aria-label="Авторизация или регистрация">
            <SvgAccountIcon />
          </Link>
          {isAuthenticated ? (
            <HeaderCart onClick={handleOpenCard} />
          ) : (
            <HeaderCartLink />
          )}
          {isAuthenticated && (
            <Card isOpen={isCardOpen} onClose={handleCloseCard} />
          )}
        </div>
      </div>
      <SearchComponent
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
}

function HeaderCart({ onClick }: { onClick: () => void }) {
  const [quantity] = useAtom(QuantityCart);

  return (
    <div
      className="relative cursor-pointer"
      aria-label="Корзина"
      onClick={onClick}
    >
      <SvgCart />
      <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm">
        {quantity}
      </span>
    </div>
  );
}

function HeaderCartLink() {
  return (
    <Link
      href="/lk"
      className="relative cursor-pointer"
      aria-label="Перейти в ЛК"
    >
      <SvgCart />
      <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm">
        0
      </span>
    </Link>
  );
}
