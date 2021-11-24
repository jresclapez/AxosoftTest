import React, { useEffect, useState } from 'react';
import 'primereact/resources/themes/fluent-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import getLastSearches from './services/getLastSearches';
import searchTweets from './services/searchTweets';
import Search from './Search';

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

  return (
    <div className="App">
      <h1> Twitter Feeds </h1>

      <span className="p-input-icon-left">
        <i className="pi pi-search" />

        <Search
          searchText={searchText}
          onSearch={handleSearch}
          onSearchTextChange={handleSearchTextChange}
        />
      </span>

      {searchResult.data ? (
        <ul>
          {searchResult.data.map((item, index) => (
            <li key={index}>{item.text}</li>
          ))}
        </ul>
      ) : (
        <div>
          <div>
            {lastSearches.map((item, index) => (
              <li key={index}>{item.search_text}</li>
            ))}
          </div>

          <div>No results found...</div>
        </div>
      )}
    </div>
  );
};

export default App;
