const imageGenerator = (url, width) => {
  const urlObject = new URL(url);
  return `https://cdn.statically.io/img/${urlObject.hostname}/w=${width},f=auto${urlObject.pathname}`;
};

export default imageGenerator;
