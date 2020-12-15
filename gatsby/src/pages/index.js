import React from 'react';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ slicemasters }) {
  return <div>{slicemasters.length !== 0 && <LoadingGrid count={4} />}</div>;
}
function HotSlices({ slices }) {
  return <div>{slices.length !== 0 && <LoadingGrid count={4} />}</div>;
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
