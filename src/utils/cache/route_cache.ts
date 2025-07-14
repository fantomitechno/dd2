const headers = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json",
  "User-Agent": "dd2.fantomitechno.dev",
});

let cache: {
  [route: string]: {
    timestamp: number;
    data: any;
  };
} = {};

const getRoute = async (
  route: string,
  text: boolean = false,
  cacheTime = 1000 * 10
): Promise<any> => {
  if (cache[route] && Date.now() - cache[route]!.timestamp < cacheTime) {
    return cache[route]!.data;
  }

  const response = await fetch(route, { headers });
  if (!response.ok) {
    if (cache[route]) return cache[route]!.data;
    cache[route] = { timestamp: Date.now(), data: null };
    return null;
  }
  const data = text ? await response.text() : await response.json();
  cache[route] = { timestamp: Date.now(), data };
  return data;
};

const getCacheSize = () => Object.keys(cache).length;

export { getRoute, getCacheSize };
