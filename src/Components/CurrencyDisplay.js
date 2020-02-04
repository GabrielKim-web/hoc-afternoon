import React from 'react';

const CurrencyDisplay = (props) => {
   // you do not need the keyword this when making just a fucntional component
   const {name, symbol, rate} = props.currency;
   return(
      <p>
         Rate: {rate}
         Currency: {name}
         Amount: {symbol}{rate * props.amount}
      </p>
   )
}

export default CurrencyDisplay;