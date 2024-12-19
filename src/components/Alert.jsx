import * as React from 'react';

const Alert = ({ name, handleCloseAlert = Function.prototype }) => {
  React.useEffect(() => {
    const timerId = setTimeout(handleCloseAlert, 3000);

    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);
  return (
    <div id="toast-container">
      <div className="toast">{name} добавлен в корзину</div>
    </div>
  );
};

export default Alert;
