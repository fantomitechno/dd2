const maps: { [name: string]: string } = {
  slip: "DeepSlip",
};

const getMaps = () => Object.keys(maps);
const getMapName = (name: string) => {
  if (!maps[name]) return undefined;
  return maps[name];
};

export { getMaps, getMapName };
