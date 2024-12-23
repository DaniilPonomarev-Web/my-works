import { getNavigation } from '../../lib/actions';
import Navigation from './nav';
import NavbarMenu from './navbar-menu';

export default async function Sidebar() {
  const data = await getNavigation();

  return (
    <>
      {/* ПК версия */}

      {data && <NavbarMenu categories={data} />}

      {/* Мобильная версия */}

      {data && <Navigation categories={data} />}
    </>
  );
}
