import React from 'react';
import Photo from '../components/Photo';
import GithubBox from '../components/GithubBox'

const Homepage = () => {
  const imageUrls = [
    "https://s3.us-west-1.amazonaws.com/wiseman2.0images/03400013.jpg",
    "https://s3.us-west-1.amazonaws.com/wiseman2.0images/hartsfield006978-r1-066-31a.jpg",
    "https://s3.us-west-1.amazonaws.com/wiseman2.0images/hartsfield009933-r1-055-26.jpg"
  ];


  return (
    <div className="homepage-container">
      <Photo urls={imageUrls} alt="Background Image" />
      <GithubBox />
      {/* Other components */}
    </div>
  );
};

export default Homepage;

