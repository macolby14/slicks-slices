import { useEffect, useState } from 'react';

export default function useLatestData() {
  // Hot slices data
  const [hotSlices, setHotSlices] = useState([]);
  // Slicemasters data

  const [slicemasters, setSlicemasters] = useState([]);

  useEffect(() => {
    // fetch the data when component loads
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query{
            StoreSettings(id: "downtown"){
            name
            slicemaster{
              name
            }
            hotSlices{
              name
            }
          }
        }`,
      }),
    })
      .then((res) => res.json())
      .then(({ data: { StoreSettings } }) => {
        setHotSlices(StoreSettings.hotSlices);
        setSlicemasters(StoreSettings.slicemaster);
      });
  }, []);

  return { hotSlices, slicemasters };
}
