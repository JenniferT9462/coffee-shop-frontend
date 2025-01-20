import withAuth from "@/util/withAuth";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [visitedPages, setVisitedPages] = useState([]);

  useEffect(() => {
    const pages = JSON.parse(localStorage.getItem("visitedPages")) || [];
    setVisitedPages(pages);

    localStorage.setItem(
      "visitedPages",
      JSON.stringify([...pages, "Dashboard"])
    );
  }, []);

  const orders = [
    { id: 1, name: "Latte", date: "2025-01-15" },
    { id: 2, name: "Espresso", date: "2025-01-16" },
  ];

  const promotions = [
    "20% off Espresso!",
    "Free Latte with any purchase over $10",
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      <p>This is your space to explore our features!</p>
      {/* Add static or token-based components */}
      <p>Pages you've visited in this session:</p>
      <ul>
        {visitedPages.map((page, index) => (
          <li key={index}>{page}</li>
        ))}
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map((order) => (
          <div key={order.id} className="card bg-base-100 shadow-lg p-4">
            <h2 className="card-title">{order.name}</h2>
            <p>Date: {order.date}</p>
          </div>
        ))}
      </div>
      <div className="card bg-base-100 shadow-lg p-4">
        <h2 className="card-title">Current Promotions</h2>
        <ul>
          {promotions.map((promo, index) => (
            <li key={index}>{promo}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
