export default function ContactDetails() {
  return (
    <section className="p-4 shadow-md rounded-lg bg-base-100">
      <h2 className="text-xl font-bold mb-4">Contact Details</h2>
      <form className="space-y-4">
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">Phone</label>
          <input
            type="tel"
            placeholder="Your Phone Number"
            className="input input-bordered w-full"
          />
        </div>
      </form>
    </section>
  );
}
