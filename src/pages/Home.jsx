import { useState } from 'react';
import { searchForShows, searchForPeople } from './../api/tvmaze';
import SearchForm from '../component/SearchForm';
import ShowGrid from '../component/shows/ShowGrid';
import ActorsGrid from '../component/actors/ActorsGrid';
const Home = () => {
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);

  const onSearch = async ({ q, searchOption }) => {
    try {
      setApiDataError(null);

      let result;

      if (searchOption == 'shows') {
        result = await searchForShows(q);
      } else {
        // eslint-disable-next-line no-unused-vars
        result = await searchForPeople(q);
      }
      setApiData(result);
    } catch (error) {
      setApiDataError(error);
    }
  };
  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error Occoured: {apiDataError.message}</div>;
    }

    if (apiData?.length === 0) {
      return <div>No Results</div>;
    }
    if (apiData) {
      return apiData[0].show ? (
        <ShowGrid shows={apiData} />
      ) : (
        <ActorsGrid actors={apiData} />
      );
    }
    return null;
  };

  return (
    <div>
      <SearchForm onSearch={onSearch} />

      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;
