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
  "Fin": 1905.0  // 17 fin
};


export const heightToFloor = (height: number) => {
  let floorRes = "-1";
  for (const [floor, floorHeight] of Object.entries(floorHeights)) {
    if (height >= floorHeight) {
      floorRes = floor;
    }
  }
  return floorRes;
}
