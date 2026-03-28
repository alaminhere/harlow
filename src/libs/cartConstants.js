export const CART_CONSTANTS = {
  ADD: 'ADDTOCART',
  INC: 'INCREMENT',
  DEC: 'DECREMENT',
  DEL: 'REMOVE',
  CLEAR: 'CLEAR',
};
export const isSame = (item, id) =>
  item?.product?.toString() === id?.toString();
