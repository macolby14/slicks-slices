import GatsbyImage from 'gatsby-image';
import React from 'react';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        console.log('test');
        const pizza = pizzas.find(
          (searchPizza) => searchPizza.id === singleOrder.id
        );
        return (
          <MenuItemStyles key={singleOrder.id}>
            <GatsbyImage fluid={pizza.image.asset.fluid} />
            <h2>{pizza.name}</h2>
            <p>
              {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
            </p>
            <button
              type="button"
              className="remove"
              title={`Remove ${singleOrder.size} ${pizza.name} from Order`}
              onClick={() => removeFromOrder(index)}
            >
              &times;
            </button>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
