export default function PaymentDetails({ cardNumber, exDate, cvv }) {
  return (
    <section className="p-4 shadow-md rounded-lg bg-base-100">
      <h2 className="text-xl font-bold mb-4">Payment Method</h2>
      <div className="space-y-4">
        <div>
          <label className="label">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            name="cardNumber"
            placeholder="Card Number"
            className="input input-bordered w-full"
            
          />
        </div>
        <div>
          <label className="label">Expiration Date</label>
          <input
            type="text"
            value={exDate}
            name="exDate"
            placeholder="MM/YY"
            className="input input-bordered w-full"
            
          />
        </div>
        <div>
          <label className="label">CVV</label>
          <input
            type="text"
            value={cvv}
            name="cvv"
            placeholder="CVV"
            className="input input-bordered w-full"
           
          />
        </div>
      </div>
    </section>
  );
}
