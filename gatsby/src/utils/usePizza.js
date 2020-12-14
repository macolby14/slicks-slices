import { useContext } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza() {
  // 1. Create some state to hold our order
  // Move state to OrderContext Provider
  const [order, setOrder] = useContext(OrderContext);
  // 2. Make a function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Make a function to remove things from order
  function removeFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }
  // 4. Send this data to a serverless function for checkout
  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
