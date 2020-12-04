import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

export default function SinglePizzaPage({ data }) {
  const { pizza } = data;

  return (
    <>
      <p>{pizza.name}</p>
    </>
  );
}

// This needs to be dynamic based on slug
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      id
      name
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;
