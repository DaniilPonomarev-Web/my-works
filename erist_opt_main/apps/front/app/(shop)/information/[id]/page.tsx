import Breadcrumb from '../../../ui/breadCrumbs';
import { getClient } from '../../../lib/apollo';
import { GetInformationTrueDocument } from '@erist-opt/meta-graphql';
import { getAuthToken } from '../../../lib/auth';

const client = getClient();

export default async function InformationPage({ params }: { params: any }) {
  const token = await getAuthToken();
  const id = params.id;

  const informationResponse = await client.query({
    query: GetInformationTrueDocument,
    variables: {
      id: id,
    },
    context: {
      headers: {
        Authorization: token,
      },
    },
  });

  const information = informationResponse.data.getInformationTrue;

  const breadcrumbs = [
    { label: 'Главная', href: '/home' },
    { label: 'Информационные страницы', href: '/information' },
    { label: information.title, href: null },
  ];

  return (
    <div className=" max-w-4xl mx-auto mt-2 mb-10 min-h-screen overflow-hidden">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <h1 className="text-3xl font-semibold mb-4">{information.title}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: information.content }}
      />
    </div>
  );
}
