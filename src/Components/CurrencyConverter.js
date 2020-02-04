import React, {Component} from 'react';

// Step 5: We import the function CurrencyDisplay...
import CurrencyDisplay from './CurrencyDisplay';

/* Step 2: A Higher Order Component is just a function that returns a new component.
   The naming convention of withNAMEofFUNCTION is common for HOCs.
   Create an arrow function called that takes in one parameter BaseComponent. The function will
   return a new class-based component that we will call Currency
*/

// BaseComponent is the component template (our callback component)
const withCurrency = (BaseComponent) => {
   return class Currency extends Component {
      constructor() {
         super();

         this.state = {
            currencyChosen: false,
            selectedCurrency: 'Select Currency',
            amount: 0
         }

         this.handleAmountDecrease=this.handleAmountDecrease.bind(this);
      }

      // Step 4: In this step, we'll create three methods to help us handle user interactions. 
      // We will be using the auto-binding (public class field syntax for these methods).
      // the part between where the constructor (and state) are optionally defined and the render is the public class field
      handleAmountIncrease = () => {
         // we are using setState with a callback, rather than an object like we do normally
         // callback will take one parameter prevState which gives us access to the state without modifying it directly
         // callback function needs to return an object that will be used to update state
         this.setState(prevState => {
            return (
               {amount: prevState.amount + 1}
            )
         })
      }

      handleAmountDecrease = () => {
         // Black Diamond; idiot-proofing
         if (this.state.amount <= 0) {
            return null;
         } else {
            this.setState(prevState => {
               return (
                  {amount: prevState.amount - 1}
               )
            })
         }
      }


      handleOptionSelect = e => {
         const userValue = e.target.value;
         this.setState(() => {
            return (
               {
                  selectedCurrency: userValue,
                  currencyChosen: userValue === 'Select Currency' ? false : true
               }
            )
         })
      }

      render() {
         const currencyData = [
            { name: 'Japanese Yen', symbol: '¥', rate: 113.6, id: 0 },
            { name: 'British Pound', symbol: '£', rate: 0.77, id: 1 },
            { name: 'Canadian Dollar', symbol: 'CAD', rate: 1.32, id: 2 },
            { name: 'Mexican Peso', symbol: 'Mex$', rate: 20.41, id: 3 },
            { name: 'Swiss Franc', symbol: 'Fr.', rate: 1.01, id: 4 }
         ]
         const currencyOptions = currencyData.map((element, index) => {
            return (
               <option key={index} value={index}>
                  {element.name}
               </option>
            )
         })
         return(
            <div id="CurrencyConverter">
               {/* Step 3: We are mapping over the currencyData array to dynamically create options. It's
               about the same as the dynamic options in my RNGerbera project. */}
            <div>
            <select value={this.state.selectedCurrency} onChange={this.handleOptionSelect}>
               <option value="Select Currency">Select Currency</option>
               {currencyOptions}
            </select>
            {/* Step 7: Conditionally render the BaseComponent, only displaying if the user has selected a currency. */}
            {this.state.selectedCurrency === "Select Currency" ? 
               <h1>Please Select Currency</h1>
            : <div>
                  {/* instead of methods like I normally do, they are arrow methods; it still doesn't change how they are referenced. */}
                  <button className="add" onClick={this.handleAmountIncrease}>+</button>
                  <button className="minus" onClick={this.handleAmountDecrease}>-</button>
                  <BaseComponent 
                  currency={currencyData[this.state.selectedCurrency]}
                  amount={this.state.amount}/>
               </div>}
            </div>
            </div>
         )
      }
   }
}

// Step 5: this variable will hold the result of invoking withCurrency, which is a component.
// ...then pass it down as an argument to the withCurrency invocation
const ExchangedCurrency = withCurrency(CurrencyDisplay);

// Black Diamond: A new component is rendered each time a new currency is selected.
// Wait a minute... isn't that very inefficient since I need to create a functional component FOR EACH component?

// export default withCurrency;
// Step 5: Instead of exporting the component itself, we are exporting a variable that 
// contains the result of invoking withCurrency, which is a component
// ...then now we have a HoC by exporting that variable that contains the invocation!
export default ExchangedCurrency;