export const getAuthHeader = () => {
  const authString = `${process.env['API_LOGIN']}:${process.env['API_PASSWORD']}`;
  const base64Auth = Buffer.from(authString).toString('base64');
  return {
    base64Auth,
  };
};
