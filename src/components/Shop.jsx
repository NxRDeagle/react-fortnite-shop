import * as React from 'react';
import axios from 'axios';
import Cart from './Cart';
import Preloader from './Preloader';
import ItemsList from './ItemsList';
import CartList from './CartList';
import { API_URL, API_KEY } from '../config';
import Alert from './Alert';

const Shop = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [order, setOrder] = React.useState([]);
  const [isCartVisible, setIsCartVisible] = React.useState(false);
  const [alertName, setAlertName] = React.useState('');

  const requestConfig = {
    url: API_URL,
    method: 'get',
    headers: {
      Authorization: API_KEY,
    },
  };

  const toggleCartVisibility = React.useCallback(() => {
    setIsCartVisible(!isCartVisible);
  }, [isCartVisible, setIsCartVisible]);

  React.useState(() => {
    const getShopItems = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(API_URL, requestConfig);
        const data = response.data.shop;
        setItems(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(`Ошибка запроса: ${err.message}`);
        } else {
          setError('Произошла неизвестная ошибка');
        }
      } finally {
        setIsLoading(false);
      }
    };
    getShopItems();
  }, []);

  const handleCloseAlert = React.useCallback(() => {
    setAlertName('');
  }, [setAlertName]);

  const addItemToCart = React.useCallback(
    (item) => {
      const itemIdx = order.findIndex((orderItem) => orderItem.id === item.id);
      if (itemIdx < 0) {
        const itemWithQuantity = {
          ...item,
          quantity: 1,
        };
        setOrder((prev) => [...prev, itemWithQuantity]);
      } else {
        const newOrder = order.map((orderItem, idx) => {
          if (idx === itemIdx) {
            return {
              ...orderItem,
              quantity: orderItem.quantity + 1,
            };
          } else return orderItem;
        });
        setOrder(newOrder);
      }
      setAlertName(item.name);
    },
    [order, setOrder, setAlertName],
  );

  const removeFromCart = React.useCallback(
    (itemId) => {
      const newOrder = order.filter((el) => el.id !== itemId);
      setOrder(newOrder);
    },
    [order, setOrder],
  );

  const incQuantity = React.useCallback(
    (itemId) => {
      const newOrder = order.map((el) => {
        if (el.id === itemId) {
          const newQuantity = el.quantity + 1;
          return {
            ...el,
            quantity: newQuantity,
          };
        } else {
          return el;
        }
      });
      setOrder(newOrder);
    },
    [order, setOrder],
  );

  const decQuantity = React.useCallback(
    (itemId) => {
      const newOrder = order.map((el) => {
        if (el.id === itemId) {
          const newQuantity = el.quantity - 1;
          return {
            ...el,
            quantity: newQuantity >= 0 ? newQuantity : 0,
          };
        } else {
          return el;
        }
      });
      setOrder(newOrder);
    },
    [order, setOrder],
  );

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="container content">
      <Cart quantity={order.length} toggleCartVisibility={toggleCartVisibility} />
      {isLoading ? <Preloader /> : <ItemsList items={items} addItemToCart={addItemToCart} />}
      {isCartVisible && (
        <CartList
          order={order}
          toggleCartVisibility={toggleCartVisibility}
          removeFromCart={removeFromCart}
          incQuantity={incQuantity}
          decQuantity={decQuantity}
        />
      )}
      {alertName && <Alert name={alertName} handleCloseAlert={handleCloseAlert} />}
    </main>
  );
};

export default Shop;
