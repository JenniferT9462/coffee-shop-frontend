export default function ShippingDetails() {
  return (
    <section className="p-4 shadow-md rounded-lg bg-base-100">
      <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
      <form className="space-y-4">
        <div>
          <label className="label">Address</label>
          <input
            type="text"
            placeholder="Street Address"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">City</label>
          <input
            type="text"
            placeholder="City"
            className="input input-bordered w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">State</label>
            <input
              type="text"
              placeholder="State"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">Zip Code</label>
            <input
              type="text"
              placeholder="Zip Code"
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </form>
    </section>
  );
}
