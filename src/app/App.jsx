import React, { useEffect, useState } from 'react';
import 'primereact/resources/themes/fluent-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import getLastSearches from './services/getLastSearches';
import searchTweets from './services/searchTweets';
import Search from './components/Search';
import LastSearches from './components/LastSearches';
import Tweets from './components/Tweets';
const App = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [lastSearches, setLastSearches] = useState([]);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(async () => {
    const lastSearchesResponse = await getLastSearches();
    setLastSearches(lastSearchesResponse);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchText.length > 0) {
      const searchResponse = await searchTweets(searchText);
      setSearchResult(searchResponse);
    }
  };

  const handleSearchClick = async (e) => {
    setSearchText(e.target.innerText);
    const searchResponse = await searchTweets(e.target.innerText);
    setSearchResult(searchResponse);
  };

  return (
    <div className="App">
      <h1> Twitter Feeds </h1>
      <Search
        searchText={searchText}
        onSearch={handleSearch}
        onSearchTextChange={handleSearchTextChange}
      />

      <br />
      {searchResult.data ? (
        <Tweets tweets={searchResult.data} />
      ) : (
        <div>
          <LastSearches
            searches={lastSearches}
            onSearchClick={handleSearchClick}
          />

          <div>No results found...</div>
        </div>
      )}
    </div>
  );
};

export default App;
