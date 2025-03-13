const getShort = (): string => {
  return crypto.randomUUID().slice(0,8);
};

const isValidUrl = (url: string): boolean => {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

  return urlRegex.test(url);
};

export { isValidUrl, getShort };