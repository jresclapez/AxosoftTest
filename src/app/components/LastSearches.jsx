import React from 'react';
import { Button } from 'primereact/Button';
import PropTypes from 'prop-types';

const LastSearches = ({ onSearchClick, searches }) => {
  return (
    <div className="card">
      <h2>Last Searches:</h2>
      <div className="p-d-flex p-ai-center p-flex-wrap">
        {searches.map((oldSearch, index) => {
          return (
            <Button
              className="twitter p-p-0"
              key={index}
              onClick={onSearchClick}
            >
              <i className="pi pi-twitter p-px-2" />
              <span className="p-px-3">{oldSearch.search_text}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

LastSearches.propTypes = {
  onSearchClick: PropTypes.func,
  searches: PropTypes.array
};

export default LastSearches;
