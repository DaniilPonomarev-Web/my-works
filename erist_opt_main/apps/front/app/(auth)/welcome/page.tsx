import Image from 'next/image';

export default function Example() {
  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <Image
          src="https://static.erist.store/banners/opt_magazies.webp"
          alt="Erist Store Banner"
          loading="lazy"
          width={1920}
          height={500}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center backdrop-blur-md backdrop-sepia md:backdrop-filter-none"
        />
        <div
          aria-hidden="true"
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-transparent"></div>
          {/* Градиентное затемнение */}
          <div className="relative mx-auto max-w-2xl lg:mx-0 py-10">
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Erist store — российский бренд женской одежды, созданный в 2016
              году.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Наша команда с любовью и особым трепетом подходит к созданию
              каждой новой коллекции. В ваших пространствах будут лучшие
              коллекции трикотажа, изделий из футера и костюмной группы.
              Лояльность аудитории нашего бренда гарантирует увеличение трафика.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Почему выгодно стать партнёром Erist store?
            </h2>
          </div>

          {/* Блок с 3 столбцами */}
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 border shadow-md bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                Скидка партнера до 50%
              </h3>
              <p className="mt-2 text-gray-600">На ассортимент бренда.</p>
            </div>
            <div className="p-6 border shadow-md bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                Минимальная сумма заказа — 50.000 руб.
              </h3>
              <p className="mt-2 text-gray-600">Удобно для старта.</p>
            </div>
            <div className="p-6 border shadow-md bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                Отсутствие ограничений по количеству
              </h3>
              <p className="mt-2 text-gray-600">На модель или размер.</p>
            </div>
            <div className="p-6 border shadow-md bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                Доступ к съёмкам каталога и контента бренда
              </h3>
              <p className="mt-2 text-gray-600">После первого заказа.</p>
            </div>
            <div className="p-6 border shadow-md bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                Поддержка презентации и продаж
              </h3>
              <p className="mt-2 text-gray-600">Фирменным мерчем.</p>
            </div>
            <div className="p-6 border shadow-md bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                Сборка и отгрузка товара
              </h3>
              <p className="mt-2 text-gray-600">В течение 1-3 дней.</p>
            </div>
            <div className="p-6 border shadow-md bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                Доставка по России
              </h3>
              <p className="mt-2 text-gray-600">
                Любой курьерской службой или транспортной компанией.
              </p>
            </div>
            <div className="p-6 border shadow-md bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                Широкий ассортимент
              </h3>
              <p className="mt-2 text-gray-600">
                стилевых и цветовых решений в каждой коллекции
              </p>
            </div>
            <div className="p-6 border shadow-md bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                Высокая сочетаемость
              </h3>
              <p className="mt-2 text-gray-600">
                всех изделий между собой, что способствует комплексным продажам
                и росту среднего чека
              </p>
            </div>
          </div>

          {/* Кнопка */}
          <div className="mt-10 text-center">
            <a
              href="/register"
              className="inline-block bg-pink-500 px-8 py-4 text-lg font-semibold text-white hover:bg-pink-600 transition"
            >
              Стать партнёром
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  width={150}
                  height={150}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-white">
                  {benefit.title}
                </h3>
                <p className="mt-1 text-base text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div> */
}

const links = [
  { name: 'Open roles', href: '#' },
  { name: 'Internship program', href: '#' },
  { name: 'Our values', href: '#' },
  { name: 'Meet our leadership', href: '#' },
];

const stats = [
  { name: 'Offices worldwide', value: '12' },
  { name: 'Full-time colleagues', value: '300+' },
  { name: 'Hours per week', value: '40' },
  { name: 'Paid time off', value: 'Unlimited' },
];

const benefits = [
  {
    image: 'https://static.erist.store/banners/shop.webp',
    title: 'Высокий процент комиссии',
    description: 'Получайте высокий процент с каждой продажи.',
  },
  {
    image: 'https://static.erist.store/banners/shop.webp',
    title: 'Широкий ассортимент',
    description: 'Предоставьте своим клиентам широкий выбор товаров.',
  },
  {
    image: 'https://static.erist.store/banners/shop.webp',
    title: 'Поддержка 24/7',
    description: 'Круглосуточная поддержка для всех партнеров.',
  },
  {
    image: 'https://static.erist.store/banners/shop.webp',
    title: 'Регулярные акции и скидки',
    description: 'Стимулируйте продажи через эксклюзивные предложения.',
  },
];
