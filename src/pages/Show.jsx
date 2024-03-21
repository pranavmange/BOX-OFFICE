import { useParams } from 'react-router-dom';

const Show = () => {
  const { showId } = useParams();
  return <div> show Pages for {showId}</div>;
};

export default Show;
