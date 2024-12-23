import { ButtonAddCart } from '../button';
import ProductOptions from './ProductOptions';
import { AddToBasket, getCart } from '../../lib/actions';
import { useFormState } from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import { toast } from '@erist-opt/shadcn/components/ui/use-toast';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { QuantityCart } from '../../lib/store/cart.store';
import { useSession } from 'next-auth/react';
import InfoTabs from './tabs/product-tabs';
import SliderProducts from './SliderProducts';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import PriceDisplayProduct from '../displayPrice/PriceDisplayProduct';
import StockInfo from './stock-info';

export default function ProductInfo({
  product,
  randProducts,
}: {
  product: any;
  randProducts: any;
}) {
  const { data: session } = useSession(); // Получаем данные сессии
  const isAuthenticated = !!session?.user; // Проверяем, авторизован ли пользователь

  const initialState: any = { success: false, message: '' };

  const AddToBasketWithId = AddToBasket.bind(null, product.id);
  const [state, dispatch] = useFormState(AddToBasketWithId, initialState);

  const [, setCounter] = useAtom(QuantityCart);

  const [quantity, setQuantity] = useState(1);
  const [selectedOptionQuantity, setSelectedOptionQuantity] = useState(
    product.quantity
  );

  const [cart, setCart] = useState<any>();

  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);

  const showTooltipWithDelay = () => {
    if (tooltipTimeout.current) {
      clearTimeout(tooltipTimeout.current);
    }
    setTooltipVisible(true);
  };

  const hideTooltipWithDelay = () => {
    tooltipTimeout.current = setTimeout(() => {
      setTooltipVisible(false);
      tooltipTimeout.current = null;
    }, 200); // Небольшая задержка для плавного перехода
  };

  useEffect(() => {
    setQuantity((prev) => Math.min(prev, selectedOptionQuantity));
  }, [selectedOptionQuantity]);

  useEffect(() => {
    if (state.cart?.quantity) {
      setCounter(state.cart.quantity);
    }

    if (state.message || state.message != '') {
      toast({
        title: state.message,
        duration: 1500,
      });
    }
    if (state.success) {
      const fetcher = async () => {
        const cart = await getCart();
        setCart(cart);
      };
      fetcher();
    }
  }, [state.message, state.success, state.resetKey, setCounter, state]);

  const handleOptionChange = (selectedOptionId: any) => {
    const selectedOption = product.options
      .flatMap((option: any) => option.values)
      .find((value: any) => value.id === selectedOptionId);

    setSelectedOptionQuantity(
      selectedOption ? selectedOption.quantity : product.quantity
    );
    setQuantity(1); // Сбрасываем количество при изменении опции
  };

  useEffect(() => {
    const fetcher = async () => {
      const cart = await getCart();
      setCart(cart);
    };
    fetcher();
  }, []);

  const isInCart = cart?.items?.some(
    (item: any) => item.product.id === product.id
  );

  return (
    <div className="w-full lg:w-2/5 lg:pl-6 flex flex-col gap-4 relative mt-4 md:mt-0 md:gap-6">
      <form
        action={dispatch}
        className="w-full flex flex-col gap-4 relative md:gap-6"
      >
        <div className="flex flex-wrap items-start justify-between relative md:mt-2 md:gap-1 md:">
          <div className="flex-1">
            <h1 className="text-xl md:text-3xl font-semibold text-gray-800">
              {product.description.name}
            </h1>
          </div>
          <p className="right-0 top-0 text-sm text-gray-400">
            {product.model !== 'no-model' && 'арт. ' + product.model}
          </p>
        </div>
        {isInCart && (
          <div className="bg-green-200 text-black p-2">В корзине</div>
        )}

        <p className="text-xl text-gray-800">
          <span className="relative group cursor-pointer flex items-center">
            <span className="font-bold whitespace-nowrap mr-2">
              {isAuthenticated ? (
                <PriceDisplayProduct price={product.price} />
              ) : (
                <Link
                  className="text-gray-400 text-sm md:text-lg flex items-center gap-1"
                  href={'/login'}
                >
                  Цена доступна после
                  <span className="underline underline-offset-1">
                    авторизации
                  </span>
                </Link>
              )}
            </span>
            {isAuthenticated && (
              <div className="relative flex items-center mt-auto mb-[1%]">
                <span
                  onMouseEnter={showTooltipWithDelay}
                  onMouseLeave={hideTooltipWithDelay}
                  className="cursor-pointer"
                >
                  <InfoCircledIcon
                    width={18}
                    height={18}
                    className="text-gray-400"
                  />
                </span>
                {isTooltipVisible && (
                  <div
                    className="absolute left-full ml-2 bg-pink-500 text-white text-xs p-2 shadow-lg z-50 w-52"
                    onMouseEnter={showTooltipWithDelay}
                    onMouseLeave={hideTooltipWithDelay}
                  >
                    Цена зависит от суммы заказа. Подробнее в разделе{' '}
                    <Link
                      href={
                        'https://opt.erist.store/information/c81b9208-f150-42f4-9f2a-edeedfdb67fc'
                      }
                      className="underline font-bold"
                    >
                      Условия сотрудничества
                    </Link>
                  </div>
                )}
              </div>
            )}
          </span>
        </p>

        <ProductOptions
          id={product.id}
          options={product.options}
          onOptionChange={handleOptionChange}
        />

        <div className="flex items-center space-x-4">
          <div className="flex flex-row items-center w-full gap-6">
            <label
              htmlFor="quantity"
              className="text-base md:text-lg text-gray-800"
            >
              Количество:
            </label>
            <div className="flex items-center border border-gray-300">
              {/* <button
            type="button"
            className="px-3 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none"
            onClick={() => setQuantity((prev) => Math.max(prev - 10, 1))}
          >
            --
          </button> */}
              <button
                type="button"
                className="px-3 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none"
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                -
              </button>
              <input
                type="text"
                className="w-16 px-2 py-2 text-center border-none outline-none appearance-none"
                id="quantity"
                name="quantity"
                value={quantity}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  let value = input.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
                  value = Math.min(
                    Math.max(1, parseInt(value || '1', 10)),
                    selectedOptionQuantity
                  ).toString(); // Приводим к диапазону 1 - selectedOptionQuantity
                  input.value = value;
                  setQuantity(parseInt(value, 10));
                }}
                onBlur={(e) => {
                  // Если поле пустое после потери фокуса, возвращаем минимальное значение
                  if (!e.target.value) {
                    e.target.value = '1';
                    setQuantity(1);
                  }
                }}
              />

              <button
                type="button"
                className="px-3 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none"
                onClick={() =>
                  setQuantity((prev) =>
                    Math.min(prev + 1, selectedOptionQuantity)
                  )
                }
              >
                +
              </button>
              {/* <button
            type="button"
            className="px-3 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none"
            onClick={() =>
              setQuantity((prev) => Math.min(prev + 10, selectedOptionQuantity))
            }
          >
            ++
          </button> */}
            </div>
            <StockInfo quantity={selectedOptionQuantity} />
          </div>
        </div>
        {/* <AddCardButton /> */}

        {isAuthenticated ? <AddCardButton /> : <GoToLkButton />}
      </form>

      {product.otherColorsProducts &&
        product.otherColorsProducts.length > 0 && (
          <SliderProducts
            text="sm"
            name="Другие цвета"
            products={product.otherColorsProducts}
          />
        )}

      {randProducts && randProducts.length > 0 && (
        <SliderProducts
          text="sm"
          name="Товары-компаньоны"
          products={randProducts}
        />
      )}

      <InfoTabs
        description={product.description}
        hrefCloudPhotos={product.hrefCloudPhotos}
      />
    </div>
  );
}

function AddCardButton() {
  return (
    <ButtonAddCart>
      <span className="flex items-center">В корзину</span>
    </ButtonAddCart>
  );
}

function GoToLkButton() {
  return (
    <ButtonAddCart asLink href="/lk">
      <span className="flex items-center">В корзину</span>
    </ButtonAddCart>
  );
}
