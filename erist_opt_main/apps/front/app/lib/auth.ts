import { auth } from '../../auth';

export const getAuthToken = async () => {
  const session = await auth();

  return `Bearer ${session?.user.access_token}`;
};
