import CheckoutForm from './CheckoutForm';

const meta = {
  component: CheckoutForm,
};

export default meta;

export const Default = {
  args: {
    handleCheckout: (name, address, phone) => {
      alert("Testing checkout")
    }
  }
};