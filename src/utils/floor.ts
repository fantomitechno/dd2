const floorHeights = {
  "0": 4.0,
  "1": 104.0, // 01
  "2": 208.0, // 02
  "3": 312.0, // 03
  "4": 416.0, // 04
  "5": 520.0, // 05
  "6": 624.0, // 06
  "7": 728.0, // 07
  "8": 832.0, // 08
  "9": 936.0, // 09
  "10": 1040.0, // 10
  "11": 1144.0, // 11
  "12": 1264.0, // 12
  "13": 1376.0, // 13
  "14": 1480.0, // 14
  "15": 1584.0, // 15
  "16": 1688.0, // 16
  Fin: 1905.0, // 17 fin
};

const customFloorHeights: { [map: string]: { [floor: string]: number } } = {
  slip: {
    "0": 26,
    "1": 162,
    "2": 284.971,
    "3": 417.45,
    "4": 533.442,
    "5": 653.516,
    "6": 781.763,
    "7": 906.247,
    "8": 1037.3,
    "9": 1166,
    "10": 1293.92,
    "11": 1421.69,
    "12": 1553.02,
    "13": 1677.59,
    "14": 1809.5,
    "15": 1935.46,
    "16": 2061.73,
    "17": 2185.16,
    "18": 2317.66,
    "19": 2449.52,
    FIN: 2709,
  },
};

export const heightToFloor = (height: number) => {
  let floorRes = "-1";
  for (const [floor, floorHeight] of Object.entries(floorHeights)) {
    if (height >= floorHeight) {
      floorRes = floor;
    }
  }
  return floorRes;
};

export const heightToFloorCustom = (type: string, height: number) => {
  let floorRes = height.toFixed(0) + "m";
  for (const [floor, floorHeight] of Object.entries(
    customFloorHeights[type] || {}
  )) {
    if (height >= floorHeight) {
      floorRes = floor;
    }
  }
  return floorRes;
};
