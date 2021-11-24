import React from 'react';
import { InputText } from 'primereact/inputtext';
import PropTypes from 'prop-types';

const Search = ({ onSearch, onSearchTextChange, SearchText }) => {
  return (
    <form onSubmit={onSearch}>
      <InputText
        id="inputText"
        value={SearchText}
        onChange={onSearchTextChange}
        placeholder="Search"
      />
    </form>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func,
  onSearchTextChange: PropTypes.func,
  SearchText: PropTypes.string
};

export default Search;
