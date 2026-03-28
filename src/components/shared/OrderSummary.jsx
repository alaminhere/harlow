const OrderSummary = ({ items }) => {
  const totalPrice = items?.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const totalDiscountPrice = items?.reduce((acc, curr) => {
    return acc + curr.discountPrice * curr.quantity;
  }, 0);

  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex justify-between text-grey">
        <span className="text-primary">{items?.length} Items</span>
        <span>{totalPrice}$</span>
      </div>
      <div className="flex justify-between text-text">
        <span>Shipping</span>
        <span>0$</span>
      </div>
      <div className="flex justify-between text-text">
        <span> Discount </span>
        <span> {totalPrice - totalDiscountPrice}$</span>
      </div>
      <div className="flex justify-between font-semibold text-primary">
        <span>Total </span>
        <span>{totalDiscountPrice}$</span>
      </div>
    </div>
  );
};

export default OrderSummary;
