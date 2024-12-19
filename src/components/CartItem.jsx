const CartItem = ({
  id,
  name,
  price,
  quantity,
  removeFromCart = Function.prototype,
  incQuantity = Function.prototype,
  decQuantity = Function.prototype,
}) => {
  return (
    <li className="collection-item">
      {name}{' '}
      <i className="material-icons cart-quantity" onClick={() => decQuantity(id)}>
        remove
      </i>
      x {quantity}{' '}
      <i className="material-icons cart-quantity" onClick={() => incQuantity(id)}>
        add
      </i>{' '}
      = {price * quantity} руб.
      <span class="secondary-content" onClick={() => removeFromCart(id)}>
        <i class="material-icons cart-delete">close</i>
      </span>
    </li>
  );
};

export default CartItem;
