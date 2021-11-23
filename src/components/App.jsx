import React, { useState } from 'react';
import IpcService from './ipcService';
import 'primereact/resources/themes/fluent-light/theme.css';
import 'primereact/resources/primereact.min.css';
import { InputText } from 'primereact/inputtext';

const ipc = new IpcService();

const App = () => {
  const [searchText, setSearchText] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchDisabled, setSearchDisabled] = useState(false);
  const [lastSearches, setLastSearches] = useState([]);

  const handleButtonOnClhange = async (request) => {
    setSearchText(request);
  };

  const handleButtonOnKeyDown = async () => {
    setSearchDisabled(true);
    const searchResponse = await ipc.send('twitter', searchText);
    setSearchResult(searchResponse);
    setSearchDisabled(false);
    getLastSearches();
  };

  const getLastSearches = async () => {
    const lastSearchesResponse = await ipc.send('infoSearch');
    setLastSearches(lastSearchesResponse);
  };

  return (
    <div className="App">
      <h1> Twitter Feeds </h1>

      <span className="p-float-label">
        <InputText
          id="in"
          value={searchText}
          onChange={({ target }) => {
            handleButtonOnClhange(target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleButtonOnKeyDown();
            }
          }}
        />
        <label htmlFor="in">type your search here</label>
      </span>

      <input
        type="test"
        disabled={searchDisabled}
        placeholder="type your search here"
        value={searchText}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleButtonOnKeyDown();
          }
        }}
        onChange={({ target }) => {
          handleButtonOnClhange(target.value);
        }}
      />

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
