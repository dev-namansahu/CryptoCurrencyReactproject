
import './App.css';
import React, { useState } from 'react';
import Headcomp from './components/Headcomp';
import Maincomp from './components/Maincomp';
import Maincomponent2 from './components/Maincomponent2';

// const DefaultComponent = () => {
//   return <h1>This is the default component.</h1>;
// };

// const SearchComponent = ({ searchTerm }) => {
//   return <h1>You searched for: {searchTerm}</h1>;
// };

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
    setShowSearchComponent(false);};
  return (
   <><Headcomp/>

   <div className="container"  style={{backgroundColor:"#F8F8F8"}}>
    <br />
    <div className="row" style={{display:"flex" , marginTop:"15px"}}>
      <div className="col-11">
   < input
          type="text"
          class="form-control"
          placeholder=" &#128269;  Search by coin"
          aria-label=" Search by coin"
          aria-describedby="basic-addon1"
        value={searchTerm} onChange={handleChange} /></div>
        <div className="col-1">
      <button style={{height:"35px"}} onClick={handleSearch}>Search</button></div> </div>
      <br />
      
      {/* <button onClick={onBackClick}>Back</button> */}
      
      {showSearchComponent ? (
        < Maincomponent2 searchTerm={searchTerm} onBackClick={handleBack}/>
      ) : (
        <Maincomp />
      )}
    {/* <Maincomponent2/> */}
   





<br />


   </div>
   
   
   
   
   
   </>
  );
}

export default App;

