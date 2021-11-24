import React, { useEffect, useState } from 'react';
import 'primereact/resources/themes/fluent-light/theme.css';
import 'primereact/resources/primereact.min.css';
import { InputText } from 'primereact/inputtext';
import searchTweets from './services/searchTweets';

const App = () => {
  const [searchText, setSearchText] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [lastSearches, setLastSearches] = useState([]);

  const handleButtonOnClhange = async (request) => {
    setSearchText(request);
  };

  useEffect(async () => {
    // const lastSearchesResponse = await getLastSearches();
    // setLastSearches(lastSearchesResponse);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const searchResponse = await searchTweets(searchText);
    setSearchResult(searchResponse);
  };

  return (
    <div className="App">
      <h1> Twitter Feeds </h1>

      <span className="p-float-label">
        <form onSubmit={handleSubmit}>
          <InputText
            id="in"
            value={searchText}
            onChange={({ target }) => {
              handleButtonOnClhange(target.value);
            }}
          />
          <label htmlFor="in">type your search here</label>
        </form>
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
