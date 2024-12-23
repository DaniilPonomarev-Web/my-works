const api = <string>process.env.API_ENDPOINT;

export const verifyTokenUser = async (access_token: string) => {
  const response = await fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      query: `{verifyTokenUser}`,
    }),
  });

  const tokensOrError = await response.json();
  if (!response.ok) throw tokensOrError;
  if (tokensOrError.errors) {
    throw Error(tokensOrError.errors);
  }

  console.debug(
    tokensOrError?.data?.verifyTokenUser ? 'Good token' : 'Fail token'
  );

  return tokensOrError?.data?.verifyTokenUser ?? false;
};

export const refreshToken = async (refresh_token: string) => {
  try {
    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
            mutation RefreshToken {
              refreshToken(refreshToken: "${refresh_token}") {
                access_token
                refresh_token
              }
            }`,
      }),
    });

    const tokensOrError = await response.json();
    if (!response.ok) throw tokensOrError;

    if (tokensOrError.errors) {
      throw Error(tokensOrError.errors);
    }

    const refreshTokenData = tokensOrError?.data?.refreshToken ?? undefined;
    if (!refreshTokenData) throw Error('Not found refreshTokenData');

    return {
      access_token: refreshTokenData.access_token,
      refresh_token: refreshTokenData.refresh_token,
    };
  } catch (error) {
    console.error('Error refreshing access_token', error);
    return;
  }
};
