import { useEffect, useState } from 'react';

export default function useLatestData() {
  // Hot slices data
  const [hotSlices, setHotSlices] = useState([]);
  // Slicemasters data

  const [slicemasters, setSlicemasters] = useState([]);

  useEffect(() => {
    // Allow graphql syntax formating in vscdoe
    const gql = String.raw;

    const frag = `
        _id
        name
        image {
          asset {
            url
            metadata {
              lqip
            }
          }
        } 
    `;

    // fetch the data when component loads
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${frag}
              }
              hotSlices {
                ${frag}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then(({ data: { StoreSettings } }) => {
        setHotSlices(StoreSettings.hotSlices);
        setSlicemasters(StoreSettings.slicemaster);
      })
      .catch((err) => {
        setHotSlices([]);
        setSlicemasters([]);
        alert(
          'Something went wrong fetching data for Homepage from Store Settings'
        );
      });
  }, []);

  return { hotSlices, slicemasters };
}
