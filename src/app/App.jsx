import React, { useEffect, useState } from 'react';
import 'primereact/resources/themes/rhea/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.min.css';
import 'primeicons/primeicons.css';
import { ProgressSpinner } from 'primereact/progressspinner';
import getLastSearches from './services/getLastSearches';
import searchTweets from './services/searchTweets';
import searchTweetsByUsername from './services/searchTweetsByUsername.js';
import Search from './components/Search';
import Tweets from './components/Tweets';

const App = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchOccurred, setSearchOccurred] = useState(false);
  const [searching, setSearching] = useState(false);
  const [lastSearches, setLastSearches] = useState([]);

  useEffect(async () => {
    await refreshLastSearches();
  }, []);

  const handleSearch = async (searchText) => {
    if (searchText.length > 0) {
      try {
        setSearchOccurred(true);
        setSearching(true);

        const searchResponse =
          searchText.charAt(0) === '@'
            ? await searchTweetsByUsername(searchText.substring(1))
            : await searchTweets(searchText);

        setSearchResult(searchResponse);
      } finally {
        setSearching(false);
        await refreshLastSearches();
      }
    }
  };

  const refreshLastSearches = async () => {
    const newLatestSearches = await getLastSearches();
    setLastSearches(newLatestSearches);
  };

  return (
    <div className="p-d-flex">
      <h1> Twitter Feeds </h1>
      <Search onSearch={handleSearch} lastSearches={lastSearches} />

      <div className="mt-3">
        {searching && <ProgressSpinner />}
        {!searching && (
          <>
            {searchResult.data && <Tweets tweets={searchResult.data} />}
            {searchOccurred && !searchResult.data && (
              <div>
                <h3>Results not found...</h3>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
