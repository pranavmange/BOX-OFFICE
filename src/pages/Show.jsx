import { useParams } from 'react-router-dom';

import { getShowById } from '../api/tvmaze';
import { useQuery } from '@tanstack/react-query';

const Show = () => {
  const { showId } = useParams();
  const { data: showData, error: showError } = useQuery({
    queryKey: ['show', showId],
    queryFn: () => getShowById(showId),
  });

  if (showError) {
    return <div>we have an error: {showError.message}</div>;
  }
  if (showData) {
    return <div>got show data: {showData.name}</div>;
  }

  return <div> Page is Loading plz wait !!</div>;
};

export default Show;
