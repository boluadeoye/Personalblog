const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  // Allow requests from your Vercel domain
  res.setHeader('Access-Control-Allow-Origin', `https://${req.headers.host}`);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { accessKey } = req.body;

    if (!accessKey) {
      return res.status(400).json({ success: false, message: 'Access key is required.' });
    }

    // Keys are stored in Vercel Environment Variables as a comma-separated string
    const validKeys = process.env.VALID_ACCESS_KEYS ? process.env.VALID_ACCESS_KEYS.split(',') : [];

    if (validKeys.includes(accessKey)) {
      // If the key is valid, create a secure session token (JWT)
      const token = jwt.sign(
        { authenticated: true },
        process.env.JWT_SECRET,
        { expiresIn: '30d' } // Token is valid for 30 days
      );
      return res.status(200).json({ success: true, token: token });
    } else {
      // If the key is invalid
      return res.status(401).json({ success: false, message: 'Invalid access key.' });
    }
  }

  // Handle any other method
  res.setHeader('Allow', ['POST']);
  res.status(405).json({ message: `Method ${req.method} Not Allowed` });
};
