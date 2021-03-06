import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import SEO from '../components/SEO';

export default function SingleSlicemasterPage({
  data: { sanityPerson: person },
}) {
  return (
    <>
      <SEO title={person.name} image={person.image.asset.src} />
      <div className="center">
        <Img fluid={person.image.asset.fluid} />
        <h2>
          <span className="mark">{person.name}</span>
        </h2>
        <p>{person.description}</p>
      </div>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    sanityPerson(slug: { current: { eq: $slug } }) {
      id
      name
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
