import clsx from 'clsx';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

type ButtonAddCartProps = {
  asLink?: boolean;
  href?: string;
  children: React.ReactNode;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onCopy'>;

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'z-10 text-center bg-neutral-950 text-white hover:bg-neutral-50 hover:text-black active:bg-neutral-200 active:text-black py-2 px-4 mt-4 w-full sm:ml-auto sm:w-1/2',
        className
      )}
    >
      {children}
    </button>
  );
}

export function ButtonLogin({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'z-10 text-center bg-neutral-950 text-white hover:bg-neutral-50 hover:text-black active:bg-neutral-200 active:text-black py-2 px-4 mt-4 w-full sm:ml-auto sm:w-full',
        className
      )}
    >
      {children}
    </button>
  );
}

export function ButtonCheckout({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'z-10 text-center bg-neutral-950 text-white hover:bg-neutral-50 hover:text-black active:bg-neutral-200 active:text-black py-2 px-4 mt-4 w-full sm:ml-auto sm:w-full',
        className
      )}
    >
      {children}
    </button>
  );
}

export function ButtonBackCheckout({
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'z-10 text-center bg-neutral-200 text-black hover:bg-neutral-950 hover:text-white active:bg-neutral-200 active:text-white py-2 px-4 mt-4 w-full',
        className
      )}
    >
      {children}
    </button>
  );
}
export function ButtonAddCart({
  children,
  className,
  asLink = false,
  href,
  ...rest
}: ButtonAddCartProps) {
  const { pending } = useFormStatus();

  const commonClasses = clsx(
    'z-10 text-center bg-neutral-950 text-white hover:bg-neutral-50 hover:text-black active:bg-neutral-200 active:text-black py-2 px-4  w-full sm:ml-auto sm:w-full',
    className
  );

  if (asLink && href) {
    const {
      form,
      formAction,
      formEncType,
      formMethod,
      formNoValidate,
      formTarget,
      ...linkRest
    } = rest;

    return (
      <Link href={href} className={commonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button {...rest} className={commonClasses} aria-disabled={pending}>
      {children}
    </button>
  );
}
