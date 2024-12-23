import Link from 'next/link';
import { getAllInformationsTrue } from '../../lib/actions';

export default async function InformationLinks() {
  const informations = await getAllInformationsTrue();
  return (
    <div className="mx-0.5">
      <span className="block text-lg font-semibold">Партнерам</span>
      <nav className="flex flex-col mt-2">
        {informations?.map((info: any) => (
          <Link
            key={info.id}
            href={`/information/${info.id}`}
            className="mt-2 text-sm hover:underline"
          >
            {info.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
