const Item = (props) => {
  const { id, name, description, price, background, addItemToCart = Function.prototype } = props;
  return (
    <div className="card">
      <div className="card-image">
        <img src={background} alt={name} />
      </div>
      <div className="card-content">
        <span className="card-title">{name}</span>
        <p>{description}</p>
        <div className="card-action">
          <button
            className="left btn pink darken-3"
            onClick={() => addItemToCart({ id, name, price })}>
            Купить
          </button>
          <span className="right" style={{ fontSize: '1.6rem' }}>
            {price} руб.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Item;
