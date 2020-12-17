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
      mapleSyrup: values.mapleSyrup,
    };

    // 4. Send this data to a serverless function for checkout
    let res = null;
    try {
      res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.log('Caught error');
      setError('Fetch to server failed');
      return err;
    }

    setLoading(false);
    const resMessage = await res
      .json()
      .then((jsonResp) => jsonResp.message)
      .catch(() => res.statusText);

    if (res.status >= 400 && res.status < 600) {
      setError(`${res.status} ${resMessage}`);
      return resMessage;
    }

    setMessage('Success! Your order is being processed');
    return resMessage;
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
