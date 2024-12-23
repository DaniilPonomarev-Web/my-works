import Link from 'next/link';

const Breadcrumb = ({ breadcrumbs }: { breadcrumbs: any[] }) => {
  return (
    <nav className="bg-white py-4 w-full max-w-6xl mx-auto px-0 ">
      {/* sm:px-6 lg:px-8 */}
      <ol className="list-reset flex flex-wrap text-gray-600 leading-none text-sm">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={index}
            className="flex items-center whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {index > 0 && (
              <>
                <span className="mx-1 leading-none text-gray-400">/</span>
              </>
            )}
            {breadcrumb.href ? (
              <Link href={breadcrumb.href} passHref>
                <span className="text-gray-600 hover:text-black font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                  {breadcrumb.label}
                </span>
              </Link>
            ) : (
              <span className="text-gray-600 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                {breadcrumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
