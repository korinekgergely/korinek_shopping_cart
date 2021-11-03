import React from 'react';
import { CartDisplayProps, Product } from './../TS.types';
import { calculateFullPrice } from './../BusinessLogic/CalculateFullPrice';

const CartDisplay: React.FC<CartDisplayProps> = (products) => {
  const { removeItem, dataSource } = products;

  const fullPrice: number = calculateFullPrice(dataSource);

  return (
    <div className="fullWidth">
      <h3>Your Cart</h3>
      <div className="tableHeader">
        <div>Name</div>
        <div className="alignRight">Quantity</div>
        <div className="alignRight">Unit Price</div>
        <div className="alignRight">Total Price</div>
      </div>
      {dataSource.map((value: Product) => {
        if (value.volume) {
          return (
            <div className="tableBody">
              <div>{value.name}</div>
              <div className="alignRight">{value.volume}</div>
              <div className="alignRight">{value.price}</div>
              <div className="alignRight">{value.volume * value.price}</div>
              <button
                className="button"
                onClick={() => {
                  removeItem(value.name);
                }}
              >
                X
              </button>
            </div>
          );
        }
        return null;
      })}
      {!isNaN(fullPrice) && (
        <div className="fullResult">Full price: {fullPrice}</div>
      )}
    </div>
  );
};

export default CartDisplay;
