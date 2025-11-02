const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, ALLOWED_REDIRECT_ORIGIN } = process.env as Record<string, string | undefined>;

function json(status: number, body: any, headers: Record<string, string> = {}) {
  return { statusCode: status, headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) };
}

function corsHeaders(origin?: string) {
  const allowList = (ALLOWED_REDIRECT_ORIGIN ?? '').split(',').map(s => s.trim()).filter(Boolean);
  const allow = origin && allowList.includes(origin) ? origin : (allowList[0] ?? '*');
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  };
}

export const handler = async (event: any) => {
  const origin = event.headers?.origin || event.headers?.Origin;
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: corsHeaders(origin), body: '' };

  const path: string = event.path || '/';
  const qs = event.queryStringParameters || {};
  const headers = corsHeaders(origin);

  if (path.endsWith('/oauth/authorize')) {
    // Decap expects {auth_url} to redirect
    const proto = event.headers['x-forwarded-proto'] || event.headers['X-Forwarded-Proto'] || 'https';
    const host = event.headers['host'] || event.headers['Host'] || event.requestContext?.domainName;
    const base = `${proto}://${host}`;
    const redirectUri = `${base}${path.replace('/oauth/authorize','')}/oauth/callback`;
    const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo`;
    return json(200, { auth_url: url }, headers);
  }

  if (path.endsWith('/oauth/callback') || path.endsWith('/oauth/token')) {
    const code = qs.code;
    if (!code) return json(400, { error: 'missing_code' }, headers);

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: GITHUB_CLIENT_ID, client_secret: GITHUB_CLIENT_SECRET, code })
    });

    const tokenJson = await tokenRes.json();
    if (!tokenJson.access_token) return json(400, { error: 'invalid_token', details: tokenJson }, headers);

    // Decap expects {token: "<access_token>"} for /callback; and raw for /token is ok as well.
    return json(200, path.endsWith('/oauth/token') ? tokenJson : { token: tokenJson.access_token }, headers);
  }

  return json(404, { error: 'not_found' }, headers);
};
