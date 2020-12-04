import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
  // 3. Loop over each pizza and create a page for that pizza
}

export async function createPages({ graphql, actions }) {
  // Create pages dynamically
  // 1. Pizzas
  await turnPizzasIntoPages({ graphql, actions });
  // 2. Toppings
  // 3. Slicemasters
}
