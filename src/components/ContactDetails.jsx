export default function ContactDetails({ name, email, phone }) {
  return (
    <section className="p-4 shadow-md rounded-lg bg-base-100">
      <h2 className="text-xl font-bold mb-4">Contact Details</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="label">Name</label>
          <input
            value={name}
            name="name"
            type="text"
            placeholder="Your Name"
            // id="name"
            // name="name" 
            className="input input-bordered w-full"
            
          />
        </div>
        <div>
          <label className="label">Email</label>
          <input
            value={email}
            name="email"
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
            
          />
        </div>
        <div>
          <label className="label">Phone</label>
          <input
            value={phone}
            name="phone"
            type="tel"
            placeholder="Your Phone Number"
            className="input input-bordered w-full"
            
          />
        </div>
      </div>
    </section>
  );
}
