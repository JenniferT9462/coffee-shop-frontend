// components/HelloBackend.js
import { useState, useEffect } from 'react';

export default function HelloBackend() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/hello');
      const data = await response.json();
      setMessage(data.message);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome to the Next.js App</h1>
      <p>{message}</p>
    </div>
  );
}
