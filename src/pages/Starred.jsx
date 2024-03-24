import { getShowByIds } from '../api/tvmaze';
import { useStarredShows } from '../lib/useStarredShows';
import { useQuery } from '@tanstack/react-query';
import ShowGrid from '../component/shows/ShowGrid';

const Starred = () => {
  const [starredShowsIds] = useStarredShows();

  const { data: starredShows, error: starredShowsError } = useQuery({
    queryKey: ['starred', starredShowsIds],
    queryFn: async () =>
      getShowByIds(starredShowsIds).then(result =>
        result.map(show => ({ show }))
      ),
    refetchOnWindowFocus: 'false',
  });
  if (starredShows?.length === 0) {
    return <div>NO Shows are starred</div>;
  }

  if (starredShows?.length > 0) {
    return <ShowGrid shows={starredShows} />;
  }

  if (starredShowsError) {
    return <div>Error Occoured : {starredShowsError.message}</div>;
  }

  return <div> shows are loading ...! </div>;
};

export default Starred;
