import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculatOrderTotal(order, pizzas) {
  return order.reduce((acc, singleOrder) => {
    const pizza = pizzas.find(
      (searchPizza) => searchPizza.id === singleOrder.id
    );
    return acc + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
}
