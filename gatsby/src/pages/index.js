import React from 'react';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      {slicemasters.map((slicemaster) => (
        <div key={slicemaster.name}>{slicemaster.name}</div>
      ))}
    </div>
  );
}
function HotSlices({ slices }) {
  return (
    <div>
      {slices.map((slice) => (
        <div key={slice.name}>{slice.name}</div>
      ))}
    </div>
  );
}

function HomePage() {
  const { hotSlices, slicemasters } = useLatestData();
  return (
    <div className="center">
      <h1>THe Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm every day</p>
      <CurrentlySlicing slicemasters={slicemasters} />
      <HotSlices slices={hotSlices} />
      <div />
    </div>
  );
}

export default HomePage;
