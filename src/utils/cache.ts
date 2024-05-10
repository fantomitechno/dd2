let cache: {
  [route: string]: {
    timestamp: number,
    data: any
  }
} = {};

const cacheTime = 1000 * 20;

const headers = new Headers({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'User-Agent': 'dd2.renoux.dev'
});

export const getRoute = async (route: string, text: boolean = false): Promise<any> => {
  if (cache[route] && Date.now() - cache[route]!.timestamp < cacheTime) {
    return cache[route]!.data;
  }

  const response = await fetch(route, { headers });
  if (!response.ok) {
    cache[route] = { timestamp: Date.now(), data: null };
    return null
  };
  const data = text ? await response.text() : await response.json();
  cache[route] = { timestamp: Date.now(), data };
  return data;
}