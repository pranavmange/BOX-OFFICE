import { useState } from 'react';
import { searchForShows, searchForPeople } from './../api/tvmaze';
import SearchForm from '../component/SearchForm';
import ShowGrid from '../component/shows/ShowGrid';
import ActorsGrid from '../component/actors/ActorsGrid';
import { useQuery } from '@tanstack/react-query';
import { TextCenter } from '../component/common/TextCenter';
// import styled, { css, ThemeProvider } from 'styled-components';

// const Button = styled.button``;

const Home = () => {
  const [filter, setFilter] = useState(null);

  const { data: apiData, error: apiDataError } = useQuery({
    queryKey: ['search', filter],
    queryFn: () =>
      filter.searchOption === 'shows'
        ? searchForShows(filter.q)
        : searchForPeople(filter.q),
    enabled: !!filter,
    refetchOnWindowFocus: 'false',
  });

  const onSearch = async ({ q, searchOption }) => {
    setFilter({ q, searchOption });
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <TextCenter>Error Occoured: {apiDataError.message}</TextCenter>;
    }

    if (apiData?.length === 0) {
      return <TextCenter>No Results</TextCenter>;
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
