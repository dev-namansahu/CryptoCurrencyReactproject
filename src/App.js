import './App.css';
import React, { useState } from 'react';
import Headcomp from './components/Headcomp';
import Maincomp from './components/Maincomp';
import Maincomponent2 from './components/Maincomponent2';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchComponent, setShowSearchComponent] = useState(false);

  const handleSearch = () => {
    setShowSearchComponent(true);
  };

  const handleBack = () => {
    setShowSearchComponent(false);
    setSearchTerm('');
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setShowSearchComponent(false);
  };

  return (
    <>
      <Headcomp />

      <div className="container" style={{ backgroundColor: '#F8F8F8' }}>
        <br />
        <div className="row" style={{ display: 'flex', marginTop: '15px' }}>
          <div className="col-lg-11 col-md-10 col-sm-9">
            <input
              type="text"
              className="form-control"
              placeholder=" &#128269;  Search by coin"
              aria-label="Search by coin"
              aria-describedby="basic-addon1"
              value={searchTerm}
              onChange={handleChange}
            
            />
          </div>
          <div className="col-lg-1 col-md-2 col-sm-3">
            <button style={{ height: '35px' }} onClick={handleSearch}  disabled={!searchTerm}>
              Search
            </button>
          </div>
        </div>
        <br />

        {showSearchComponent ? (
          <Maincomponent2 searchTerm={searchTerm} onBackClick={handleBack} />
        ) : (
          <Maincomp />
        )}

        <br />
      </div>
    </>
  );
}
// app

export default App;
