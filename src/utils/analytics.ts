let analytics: {
  [hashedIp: string]: number
} = {};

const hash = (s: string) => {
  return s.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
}

const addVisite = (ip: string) => {
  analytics[hash(ip)] = Date.now();
}

const getVisites = (time: number) => {
  return Object.entries(analytics).filter((_, date) => Date.now() - date > time).length;
}

export { addVisite, getVisites }