//refer to D3_SeqScrapper repo's outfile to see sample json file that is used




import React, { useState, useEffect } from 'react';
import jsonData from './overall.json';
import './App.css';

const Item = ({ title, data, searchTerm, setSearchTerm }) => {
  const handleButtonClick = value => {
    setSearchTerm(value);
  };

  return (
    <div className="item">
      <h3>Title: {title}</h3>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          {key} {Array.isArray(value) ? (
            <ul className="list">
              {value.map((item, index) => (
                <li key={index}>
                  <button
                    className="list-button"
                    onClick={() => handleButtonClick(item)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            `${value}`
          )}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [shownResults, setShownResults] = useState([]);

  const handleSearch = event => {
    const value = event.target.value;
    setSearchTerm(value);
    setShownResults([]);
  };

  useEffect(() => {
    if (searchTerm) {
      setShownResults(prevResults => [...prevResults, searchTerm]);
    } else {
      setShownResults([]);
    }
  }, [searchTerm]);

  const filteredData = jsonData.filter(item => {
    const title = Object.keys(item)[0];

    if (title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }

    return false;
  });

  return (
    <div className="app">
      <h1>Displaying JSON Data</h1>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by title"
        />
      </div>
      {shownResults.length > 0 && searchTerm && (
        <div className="shown-results">
          <h2>Shown Results:</h2>
          <ul className="shown-results-list">
            {shownResults.map((result, index) => (
              <li key={index}>
                <button
                  className="search-result-button"
                  onClick={() => setSearchTerm(result)}
                >
                  {result}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ul className="title-list">
        {filteredData.map((item, index) => {
          const title = Object.keys(item)[0];
          const data = item[title];

          return (
            <li key={index}>
              <Item
                title={title}
                data={data}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;





