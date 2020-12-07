import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import React from 'react';
import SEO from '../components/SEO';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import useForm from '../utils/useForm';

export default function OrderPage({
  data: {
    allSanityPizza: { nodes: pizzas },
  },
}) {
  const { values, updateValues } = useForm({
    name: '',
    email: '',
  });

  console.log(pizzas);

  return (
    <>
      <SEO title="Order a Pizza" />
      <form>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={updateValues}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={updateValues}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <div key={pizza.id}>
              <GatsbyImage
                with="50"
                height="50"
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button key={size} type="button">
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </fieldset>
        <fieldset>
          <legend>Order</legend>
        </fieldset>
      </form>
    </>
  );
}

export const query = graphql`
  {
    allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
