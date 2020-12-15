import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculatOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, values }) {
  // 1. Create some state to hold our order
  // Move state to OrderContext Provider
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 2. Make a function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Make a function to remove things from order
  function removeFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }

  // Function when someone submits the form
  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage('');
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculatOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };

    // 4. Send this data to a serverless function for checkout
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    setLoading(false);

    if (res.status >= 400 && res.status < 600) {
      setError(`${res.status} ${res.statusText}`);
      return res.status;
    }
    const text = await res.json();
    setMessage('Success! Your order is being processed');
    return text;
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
