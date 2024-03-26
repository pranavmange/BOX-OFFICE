import { getShowByIds } from '../api/tvmaze';
import { useStarredShows } from '../lib/useStarredShows';
import { useQuery } from '@tanstack/react-query';
import ShowGrid from '../component/shows/ShowGrid';
import { TextCenter } from '../component/common/TextCenter';

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
    return (
      <TextCenter>
        Nothing to show, you might not have starred anything
      </TextCenter>
    );
  }

  if (starredShows?.length > 0) {
    return <ShowGrid shows={starredShows} />;
  }

  if (starredShowsError) {
    return (
      <TextCenter>Error Occoured : {starredShowsError.message}</TextCenter>
    );
  }

  return <TextCenter> shows are loading ...! </TextCenter>;
};

export default Starred;
