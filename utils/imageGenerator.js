const imageGenerator = (url, width) => {
  if (!url) {
    return '';
  }
  try {
    const urlObject = new URL(url);
    return `https://cdn.statically.io/img/${urlObject.hostname}/w=${width},f=auto${urlObject.pathname}`;
  } catch (err) {
    return '';
  }
};

export default imageGenerator;
