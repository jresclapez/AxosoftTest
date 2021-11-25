import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import PropTypes from 'prop-types';
import { Menu } from 'primereact/menu';

const createOptions = (searches, callback) => {
  return [
    {
      label: 'Latest Searches',
      items: searches.map(({ searchText }) => ({
        label: searchText,
        command: () => callback(searchText)
      }))
    }
  ];
};

const Search = ({ onSearch, lastSearches }) => {
  const [search, setSearch] = useState('');
  const menuRef = useRef();

  const handleMenuClick = (selectedSearch) => {
    setSearch(selectedSearch);
    onSearch(selectedSearch);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      hideMenu(e);
    } else {
      showMenu(e);
    }
  };

  const handleSearchFocus = (e) => {
    showMenu(e);
  };

  const handleSearchClick = (e) => {
    showMenu(e);
  };

  const showMenu = (e) => {
    if (menuRef.current) {
      menuRef.current.show(e);
    }
  };

  const hideMenu = (e) => {
    if (menuRef.current) {
      menuRef.current.hide(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          id="inputText"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          onClick={handleSearchClick}
        />
        {lastSearches.length > 0 && (
          <Menu
            model={createOptions(lastSearches, handleMenuClick)}
            popup
            ref={menuRef}
          />
        )}
      </span>
    </form>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func,
  lastSearches: PropTypes.array
};

export default Search;
