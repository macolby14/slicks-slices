import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters On</span>
      </h2>
      <p>Standing by, ready to slice you up a piece!</p>
      {slicemasters?.length === 0 && <LoadingGrid count={4} />}
      {slicemasters?.length !== 0 && <ItemGrid items={slicemasters} />}
    </div>
  );
}
function HotSlices({ slices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {slices?.length === 0 && <LoadingGrid count={4} />}
      {slices?.length !== 0 && <ItemGrid items={slices} />}
    </div>
  );
}

function HomePage() {
  const { hotSlices, slicemasters } = useLatestData();
  return (
    <div className="center">
      <h1>THe Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm every day</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices slices={hotSlices} />
      </HomePageGrid>
      <div />
    </div>
  );
}

export default HomePage;
