import { informationData } from '../../mockdata/informationsData';
export const revalidate = 0;

// TODO я пробовал сделать через роутер, чтобы он определял name и ссылку, но чет нихуя [name].tsx. Чтобы был путь information/[name]
const InformationPage = () => {
  // const information = informationData.data.getAllInformationsTrue.find(info => info.name === 'contact-us');
  const information = informationData.data.getAllInformationsTrue.find(
    (info) => info.name === 'about'
  );

  if (!information) {
    return <p>Страница не найдена</p>;
  }

  return (
    <main className="w-full flex flex-col items-center justify-start min-h-screen">
      <div className="py-4 w-full max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold py-4">{information.title}</h1>
        <div
          className="text-lg text-gray-800"
          dangerouslySetInnerHTML={{ __html: information.content }}
        />
      </div>
    </main>
  );
};

export default InformationPage;
