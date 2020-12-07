import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValues(e) {
    let { value } = e.target;

    // If input type is value, change to number
    if (e.target.type === 'number') {
      value = parseInt(value);
    }

    setValues({ ...values, [e.target.name]: value });
  }

  return { values, updateValues };
}
