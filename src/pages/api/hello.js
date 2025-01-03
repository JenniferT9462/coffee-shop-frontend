// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ message: "Hello from the backend!" });
// }

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hello from the backend!' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

