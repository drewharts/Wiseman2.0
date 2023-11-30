import React from 'react';
import Photo from '../components/Photo'; // Adjust the path as per your project structure

const Homepage = () => {
  return (
    <div>
      <Photo url="https://s3.us-west-1.amazonaws.com/wiseman2.0images/hartsfield006978-r1-066-31a.jpg" alt="Descriptive Alt Text" />
      <div className="content">
        {/* Your homepage content goes here */}
        <h1>Welcome to My Website</h1>
        <p>This is the homepage of my personal website.</p>
        {/* Other components and content */}
      </div>
    </div>
  );
};

export default Homepage;
