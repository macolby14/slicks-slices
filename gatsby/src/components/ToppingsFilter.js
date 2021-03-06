import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    background: var(--grey);
    align-items: center;
    border-radius: 2px;
    font-size: clamp(1.5rem, 1.4vw, 2.5rem);
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  // Return the pizzas with counts
  const toppings = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      if (!acc[topping.id]) {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          ct: 1,
        };
      } else {
        acc[topping.id].ct += 1;
      }
      return acc;
    }, {});
  const sortedToppings = Object.values(toppings).sort((a, b) => b.ct - a.ct);
  return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
  // Get a list of all the toppings
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  // Get a list of all teh Pizzas with their toppings
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  // Count how many pizzas are in each topping
  // Loop over the list of toppings and display the topping and count of pizzas with Topping
  // Link it up
  return (
    <ToppingStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link
          key={topping.id}
          to={`/topping/${topping.name}`}
          className={activeTopping === topping.name ? 'active' : ''}
        >
          <span className="name">{topping.name}</span>
          <span className="count">{topping.ct}</span>
        </Link>
      ))}
    </ToppingStyles>
  );
}
