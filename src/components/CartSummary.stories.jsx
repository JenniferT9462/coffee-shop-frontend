import CartSummary from './CartSummary';

const meta = {
  component: CartSummary,
};

export default meta;

export const Default = {
  args: {
    totalItems: "4",
    totalPrice: "23.67"
  }
};

export const WithTitle = {
  args: {
    totalItems: "4",
    totalPrice: "23.67",
    title: "Items in your Cart:"
  }
};