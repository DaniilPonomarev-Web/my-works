import { GetAllInformationsTrueDocument } from '@erist-opt/meta-graphql';
import { getClient } from '../../lib/apollo';
import { getAuthToken } from '../../lib/auth';
import { informationData } from '../../mockdata/informationsData';
import InformationList from '../../ui/informationsList';

const client = getClient();

export default async function Information() {
  const token = await getAuthToken();

  const { data, loading } = await client.query({
    query: GetAllInformationsTrueDocument,
    context: {
      headers: {
        Authorization: token,
      },
    },
  });
  const informationsData = data.getAllInformationsTrue;

  return (
    <main className="w-full flex flex-col items-center justify-start min-h-screen">
      <div className="py-4 w-full max-w-6xl mx-auto">
        {!loading && <InformationList informations={informationsData} />}
      </div>
    </main>
  );
}
