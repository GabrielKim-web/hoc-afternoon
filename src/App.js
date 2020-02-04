import React, { Component } from 'react';
import CurrencyConverter from './Components/CurrencyConverter';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h2>This is a Higher Order Component!</h2>
        <>
        {/* Step 6: We import the component CurrencyConverter, which returns a variable
        ExchangedCurrency. The variable ExchangedCurrency returns a variable (defined as an arrow function)
        accepting another component CurrencyDisplay as an argument. CurrencyDisplay is simply a functional component
        that displays JSX. */}
          <CurrencyConverter />
        </>
      </div>
    );
  }
}

export default App;
