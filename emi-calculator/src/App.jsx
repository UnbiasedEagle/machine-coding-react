import { useState } from 'react';

const App = () => {
  const [principal, setPrincipal] = useState(0);
  const [interest, setInterest] = useState(0);
  const [years, setYears] = useState(0);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = parseInt(e.target.value);

    if (id === 'principal') {
      setPrincipal(value);
    }
    if (id === 'interest') {
      setInterest(value);
    }
    if (id === 'years') {
      setYears(value);
    }
  };

  let emi = 0;

  if (principal && interest && years) {
    const monthlyInterestRate = interest / 12 / 100;
    const numberOfPayments = years * 12;

    emi =
      (principal *
        monthlyInterestRate *
        (1 + monthlyInterestRate) ** numberOfPayments) /
      ((1 + monthlyInterestRate) ** numberOfPayments - 1);

    emi = emi.toFixed(2);
  }

  return (
    <div className='loan-calc'>
      <h1>Mortgage Caclulator</h1>
      <div className='inputs'>
        <p>Principal Amount:</p>
        <input onChange={handleChange} type='number' id='principal' />
        <p>Interest Rate:</p>
        <input onChange={handleChange} type='number' id='interest' />
        <p>Years:</p>
        <input onChange={handleChange} type='number' id='years' />
      </div>
      <div className='output'>Your EMI is {emi}</div>
    </div>
  );
};

export default App;
