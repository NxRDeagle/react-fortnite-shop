const Cart = (props) => {
  const { quantity = 0, toggleCartVisibility = Funciton.prototype } = props;
  return (
    <div className="cart" onClick={toggleCartVisibility}>
      <i className="material-icons">shopping_cart</i>
      {quantity ? <span className="cart-quantity"> {quantity}</span> : null}
    </div>
  );
};

export default Cart;
