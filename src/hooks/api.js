import { useState, useEffect } from "react";

// export function useFetch(url, initialState) {
//     const [data, setData] = useState(initialState);
//     const [fetchError, setFetchError] = useState(false);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//               setLoading(true);
//               const result = await fetch(url);
//               if (!result.ok) {
//                 console.log("fetch failed with " + result.status);
//                 setFetchError(true);
//               } else {
//                 const productData = await result.json();
//                 setData(productData.products);
//                 console.log("Fetched Products:", productData); // Debug log
//               }
//             } catch (error) {
//               console.error("Error fetching products:", error);
//               setFetchError(true);
//             } finally {
//               setLoading();
//             }
//         }
//         fetchData()
//     }, [url]);
//     return [fetchError, loading, data];
   
// }

export function useAuthFetch(url, initialState, token) {
  const [data, setData] = useState(initialState);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function fetchData() {
          try {
            if (!token) {
              console.log("No token provided");
              return;
            }
            setLoading(true);
            const result = await fetch(url, {
              headers: {
                "Authorization": `Bearer ${token.replace(/['"]+/g, '')}`,
              }
            });
            if (!result.ok) {
              console.log("fetch failed with " + result.status);
              setFetchError(true);
            } else {
              const productData = await result.json();
              setData(productData.products);
              console.log("Fetched Products:", productData); // Debug log
            }
          } catch (error) {
            console.error("Error fetching products:", error);
            setFetchError(true);
          } finally {
            setLoading();
          }
      }
      fetchData()
  }, [url, token]);
  return [fetchError, loading, data];
 
}