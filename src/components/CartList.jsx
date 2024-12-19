import CartItem from './CartItem';

const CartList = ({
  order = [],
  toggleCartVisibility = Function.prototype,
  removeFromCart = Function.prototype,
  incQuantity = Function.prototype,
  decQuantity = Function.prototype,
}) => {
  const totalPrice = order.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  return (
    <ul class="collection cart-list">
      <li className="collection-item cart-active" style={{ color: 'white' }}>
        Корзина
      </li>
      {order.length ? (
        order.map((item) => {
          return (
            <CartItem
              key={item.id}
              {...item}
              removeFromCart={removeFromCart}
              incQuantity={incQuantity}
              decQuantity={decQuantity}
            />
          );
        })
      ) : (
        <li className="collection-item">Корзина пустая</li>
      )}
      <li className="collection-item cart-active" style={{ color: 'white' }}>
        Общая стоимость: {totalPrice} руб.
      </li>{' '}
      <li className="collection-item">
        <button className="btn btn-small pink darken-4">Оформить</button>
      </li>
      <i class="material-icons cart-close-icon" onClick={toggleCartVisibility}>
        close
      </i>
    </ul>
  );
};

export default CartList;
