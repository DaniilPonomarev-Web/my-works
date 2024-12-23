import React from 'react';
import Link from 'next/link';
import { InformationLinksProps } from '../../interfaces/informations/information.interface';

const InformationList: React.FC<InformationLinksProps> = ({ informations }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Информационные страницы
      </h2>
      <ul className="space-y-4 mt-12">
        {informations.map((info) => (
          <li key={info.id}>
            <Link
              href={`/information/${info.id}`}
              className="block p-4 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
            >
              <span className="text-lg font-medium text-gray-700 hover:text-pink-600">
                {info.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InformationList;
