const commentsWeight = 2;
const reactsWeight = 1;
const votesWeight = 0.5;
const timestampWeight = 5;
const shareWeight = 0.01;

export default (comments, shares, reacts, votes, timestamp) => {
  const timestampScore = Math.floor(new Date(timestamp).getTime() / 1000) / 1000000;

  return (
    (comments * commentsWeight)
    + (shares * shareWeight)
    + (reacts * reactsWeight)
    + (votes * votesWeight)
    + (timestampScore * timestampWeight)) / 100;
};
