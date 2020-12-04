import path from 'path';
import fetch from 'isomorphic-fetch';

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
  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);
  // 3. Loop over each pizza and create a page for that pizza
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1. Fetch list of beers
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  // 2. Loop over each one
  for (const beer of beers) {
    // create a node for each beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    // 3. Create a node for that beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

async function trunSlicemastersIntoPages({ graphql, actions }) {
  // 1. Query all slicemasters
  const {
    data: {
      allSanityPerson: { nodes: slicemasters },
    },
  } = await graphql(`
    query {
      allSanityPerson {
        totalCount
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // 2. Turn each slicemaster into their own page
  // 3. Figure out how manyp pages based on how many slicemasters
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  console.log(`Page size is ${pageSize}`);
  const pageCount = Math.ceil(slicemasters.length / pageSize);
  // 4. Loop from 1 to #pages and createpages for them
  for (let i = 1; i <= pageCount; i += 1) {
    actions.createPage({
      path: `/slicemasters/${i}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: (i - 1) * pageSize,
        currentPage: i,
        pageSize,
      },
    });
  }
}

export async function sourceNodes(params) {
  // fetch beers from api
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages({ graphql, actions }) {
  // Create pages dynamically
  // 1. Pizzas
  // 2. Toppings
  // 3. Slicemasters
  await Promise.all([
    turnPizzasIntoPages({ graphql, actions }),
    turnToppingsIntoPages({ graphql, actions }),
    trunSlicemastersIntoPages({ graphql, actions }),
  ]);
}
