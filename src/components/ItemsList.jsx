import Item from './Item';

const ItemsList = ({ items = [], addItemToCart = Function.prototype }) => {
  if (!items.length) {
    return <h3>Предметы не найдены...</h3>;
  }
  return (
    <div className="items_container">
      {items.map((item) => {
        const key = item.offerId;
        const props = {
          id: key,
          name: item.displayName,
          description: item.displayDescription,
          price: item.price.finalPrice,
          background: item.displayAssets[0].full_background,
        };
        return <Item key={key} {...props} addItemToCart={addItemToCart} />;
      })}
    </div>
  );
};

export default ItemsList;
