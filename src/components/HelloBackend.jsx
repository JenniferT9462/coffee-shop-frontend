// components/HelloBackend.js
import { useEffect } from 'react';

export default function HelloBackend() {
  const fetchGreeting = async () => {
    try {
      const response = await fetch('/api/hello'); // Make an HTTP request to the API route
      const data = await response.json(); // Parse the response as JSON
      console.log(data); // Log the data
    } catch (error) {
      console.error('Error fetching greeting:', error);
    }
  };

  useEffect(() => {
    fetchGreeting(); // Call the function when the component mounts
  }, []);

  return <div>Hello Backend</div>;
}
