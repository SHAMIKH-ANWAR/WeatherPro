import React from 'react';
import './styles.css';
import GlobeViz from './GlobeViz';  // Import the GlobeViz component

function Addcities() {
  return (
    <div className="addcities-container w-full h-12 relative flex text-center">
      <p className='translate-y-11 xl:text-2xl texti ml-5'>Search for weather worldwide without any interruption,<br></br>always stay aware of your surroundings with the help of weatherpro<br></br> find weather forecast ,details and many more about your searched location<br></br>feel free to contribute and in improvement of this site.<br></br><h1 className='text-red-50'>Developer:Shamikh</h1></p>
      <div className="globe-wrapper w-full h-64">
        <GlobeViz />
      </div>
    </div>
  );
}

export default Addcities;
