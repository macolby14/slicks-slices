import { graphql } from 'gatsby';
import React from 'react';
import BeersList from '../components/BeersList';

export default function BeersPage({
  data: {
    allBeer: { nodes: beers },
  },
}) {
  return (
    <>
      <h2 className="center">
        We have {beers.length} Beers Available. Dine in Only!
      </h2>
      <BeersList beers={beers} />
    </>
  );
}

export const query = graphql`
  {
    allBeer {
      nodes {
        name
        price
        id
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;
