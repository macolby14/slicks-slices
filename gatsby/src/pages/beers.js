import { graphql } from 'gatsby';
import React from 'react';
import BeersList from '../components/BeersList';
import SEO from '../components/SEO';

export default function BeersPage({
  data: {
    allBeer: { nodes: beers },
  },
}) {
  return (
    <>
      <SEO title={`Beers - We have ${beers.length} in stock`} />
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
