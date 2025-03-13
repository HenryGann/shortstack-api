// Generates UNIX epoch time 7 days from now
const getTTL = (): number => {
  return Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60);
};

export default getTTL;